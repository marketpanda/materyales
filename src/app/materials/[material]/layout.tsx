import { Box, Flex, Heading, } from "@radix-ui/themes"; 
import Image from "next/image";
import ComponentButtons from "../..//components/ComponentButtons";
 
export default function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
         
        {children}
    </>
     
  );
}
