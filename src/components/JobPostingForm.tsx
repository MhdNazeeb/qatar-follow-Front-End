"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImagePlus } from 'lucide-react';
import { useForm, Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateJob } from '@/api/hooks/useCreateJob';
import { useGetJob } from '@/api/hooks/useGetJob';
import { useEditJobs } from '@/api/hooks/useEditJobs';

export interface FormInputs {
  jobTitle: string;
  companyName: string;
  jobType: string;
  industry: string;
  jobDescription: string;
  email: string;
  websiteLink: string;
  experience: string;
  expirationDate: string;
  image: File | null;
  phone: string;
}
interface JobPostingFormProps {
  isEdit: boolean;
  jobId?: string;

}
const JobPostingForm = ({ isEdit, jobId }: JobPostingFormProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageError, setImageError] = useState<string>("");
  const { mutate, isPending, isError, error } = useCreateJob();
  const { data: jobData, isLoading } = useGetJob(jobId || '', isEdit);
  const { mutate: editJob } = useEditJobs();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset

  } = useForm<FormInputs>({
  });

  const onSubmit = (data: FormInputs) => {
    // Check if there's an image error before submitting
    if (imageError) {
      return;
    }

    if (isEdit) {
      const formData = editJob({
        id: jobId,
        ...data
      })
    } else {
      mutate(data)
      reset();
      setImageError("");
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const maxSize = 3 * 1024 * 1024;

      if (file.size > maxSize) {
        setImageError(`Image size must be less than 3MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
        setValue("image", null);
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        setImageError('Please select a valid image file');
        setValue("image", null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      // Clear any previous errors
      setImageError("");
      setValue("image", file);
    }
  }, [setValue]);

  useEffect(() => {
    if (jobData) {
      reset({
        jobTitle: jobData.jobTitle || "",
        companyName: jobData.companyName || "",
        jobType: jobData.jobType || "",
        industry: jobData.industry || "",
        jobDescription: jobData.jobDescription || "",
        email: jobData.email || "",
        phone: jobData.phone || "",
        websiteLink: jobData.websiteLink || "",
        experience: jobData.experience || "",
        expirationDate: jobData.expirationDate
          ? new Date(jobData.expirationDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [jobData, reset]);

  const image = watch('image');

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{isEdit ? "Edit Job" : "Create New Job"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              {...register("companyName", {
              })}
              id="companyName"
              placeholder="Enter company name"
              className={`w-full ${errors.companyName ? 'border-red-500' : ''}`}
              aria-invalid={errors.companyName ? "true" : "false"}
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
            )}
          </div>

          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input
              {...register("jobTitle", {
                required: "Job title is required"
              })}
              id="jobTitle"
              placeholder="Enter job title"
              className={`w-full ${errors.jobTitle ? 'border-red-500' : ''}`}
              aria-invalid={errors.jobTitle ? "true" : "false"}
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
            )}
          </div>

          {/* Job Type and Industry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Job Type</Label>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="Temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Industry</Label>
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="hospitality">Hospitality & Hotels</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="media">Media & Entertainment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Experience and Expiration Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Required</Label>
              <Input
                {...register("experience")}
                id="experience"
                placeholder="e.g., 2-3 years"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expirationDate">Job Expiration Date</Label>
              <Input
                {...register("expirationDate")}
                id="expirationDate"
                type="date"
                min={getTomorrowDate()}
                className="w-full"
              />
            </div>
          </div>

          {/* Email and Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                id="email"
                type="email"
                placeholder="Enter contact email"
                className={`w-full ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone</Label>
              <Input
                {...register("phone", {
                  pattern: {
                    value: /^(?:\+974)?[3-7]\d{7}$/,
                    message: "Please enter a valid Qatar phone number"
                  }
                })}

                id="phone"
                type="tel"
                placeholder="Enter contact phone"
                className={`w-full ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>


            <div className="space-y-2">
              <Label htmlFor="websiteLink">Website Link</Label>
              <Input
                {...register("websiteLink", {
                  pattern: {
                    value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}([\/\w.-]*)*\/?$/,
                    message: "Please enter a valid URL"
                  }
                })}
                id="websiteLink"
                type="url"
                placeholder="Enter company website"
                className={`w-full ${errors.websiteLink ? 'border-red-500' : ''}`}
              />
              {errors.websiteLink && (
                <p className="text-red-500 text-sm mt-1">{errors.websiteLink.message}</p>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description *</Label>
            <Textarea
              {...register("jobDescription", {
                required: "Job description is required",
              })}
              id="jobDescription"
              placeholder="Enter detailed job description"
              className={`min-h-32 ${errors.jobDescription ? 'border-red-500' : ''}`}
            />
            {errors.jobDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.jobDescription.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Upload Image</Label>
            <div className="flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <Button
                type="button"
                variant="outline"
                className={`w-full ${imageError ? 'border-red-500' : ''}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="w-4 h-4 mr-2" />
                {image ? 'Change Image' : 'Upload Image'}
              </Button>
              {image && (
                <span className="text-sm text-gray-500">
                  {(image as File).name}
                </span>
              )}
            </div>
            {imageError && (
              <p className="text-red-500 text-sm mt-1">{imageError}</p>
            )}
            <p className="text-sm text-gray-500">Maximum file size: 3MB</p>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          onClick={handleSubmit(onSubmit)}
          disabled={!!imageError}
        >
          Submit Job Posting
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobPostingForm;