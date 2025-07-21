

import MentorList from "@/components/mentors/MentorList";

export default function Page() {

  return (
    <div className="flex min-hs-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <MentorList />
      </div>
    </div>
  );
}
