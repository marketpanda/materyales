import { Box, Flex, Heading, } from "@radix-ui/themes"; 
import Image from "next/image";
import ComponentButtons from "../components/ComponentButtons";
 
export default function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     

    <main className="flex min-h-screen flex-col items-center gap-2 bg-gray-100 border">
    <div className="w-full sm:w-[640px] flex flex-col gap-2"> 
     
      {children}
    </div>
  </main>
    
  );
}
