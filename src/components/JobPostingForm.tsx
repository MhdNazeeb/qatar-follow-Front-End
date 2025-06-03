"use client"
import React, { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImagePlus } from 'lucide-react';
import { useForm, Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateJob } from '@/api/hooks/useCreateJob';

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
}

const JobPostingForm = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate, isPending, isError, error } = useCreateJob();


  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset

  } = useForm<FormInputs>({
    defaultValues: {
      jobTitle: '',
      companyName: '',
      jobType: '',
      industry: '',
      jobDescription: '',
      email: '',
      websiteLink: '',
      experience: '',
      expirationDate: '',
      image: null,
    }
  });

  const onSubmit = (data: FormInputs) => {
    mutate(data)
    reset();
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
    }
  };

  const image = watch('image');

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Create New Job</CardTitle>
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
              <Label htmlFor="websiteLink">Website Link</Label>
              <Input
                {...register("websiteLink", {
                  pattern: {
                    value: /^https?:\/\/.+/,
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
                className="w-full"
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
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" onClick={handleSubmit(onSubmit)}>
          Submit Job Posting
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobPostingForm;