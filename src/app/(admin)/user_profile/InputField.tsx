
export default function InputField({ label='full name', type = "text", value='naseeb', onChange, placeholder }:any) {
  return (
    <div className="mb-4">
      <label className="block text-gray-300 font-thin mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly
        className="w-full md:w-[50%] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
 
    </div>
  );
}
