'use client';

import BeneficiaryForm from "@/components/beneficiaries/BeneficiaryForm";

export default function Page() {
  const handleSuccess = () => {
    console.log("Form submitted successfully");
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <BeneficiaryForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
