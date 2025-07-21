import BeneficiaryDetail from "@/components/beneficiaries/BeneficiaryDetail";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    console.log("Page ID received:", id); // Debug log

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <BeneficiaryDetail beneficiaryId={id} />
            </div>
        </div>
    );
}