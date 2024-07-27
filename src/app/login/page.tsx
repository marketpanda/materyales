"use client"
 
import * as z from "zod" 
import { Box, Flex, Heading } from '@radix-ui/themes'
import Image from 'next/image'
import * as Form from '@radix-ui/react-form' 
import OAuthForm from '../components/OAuthForm'
import { login } from "@/lib/auth-action"
 

const FormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password is required"
    }) 
    
  })
 

type FormData = z.infer<typeof FormSchema>

export default function LoginPage() {
 

  
  return (
    <>
      <main className="flex min-h-screen justify-center items-center gap-2 bg-gray-100 ">
        <div className="w-full sm:w-[640px] flex flex-col gap-2"> 
        
          <Box className="rounded-md shadow bg-white borderd mt-2 flex sm:flex-row flex-col gap-2"> 

            <Flex  wrap="wrap"  justify="between" className="w-full">
               
              <Box className="sm:flex-1 w-full rounded-l-md overflow-hidden">
                <div className="sm:h-full h-[300px] bg-blue-300 relative">
                  <Image alt="" layout="fill" objectFit="cover" className="absolute inset-o" src="https://znetflooring.com/media/catalog/product/cache/2bd175c9fdca7a1f445c94dbd4a9111b/6/f/6f9e783ab474dbdb351bee10fa6e1f2c1ef0fcd16404f074a709fc6f4b6c0fcb.jpeg" />
                </div>
              </Box> 
              <Box  className="sm:w-2/3 w-full p-4"> 
               
              <Heading size="5" className="mt-2">Login</Heading>
              
              <Form.Root className="w-full" action=""  >
                  <Form.Field className="grid mb-[10px]" name="email">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="text-[15px] font-medium leading-[35px]">Username/Email</Form.Label>
                        <Form.Message className="text-[13px] opacity-[0.8]" match="valueMissing">
                          Please enter your email or username
                        </Form.Message>
                    </div>
                  <Form.Control asChild>
                    <input
                          className="box-border text-right w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                          // value={length !== null ? length : ''}
                          // onChange={ }
                          name="email"
                          autoComplete='off'
                          required
                    />
                  </Form.Control>
                  </Form.Field>
                  <Form.Field className="grid mb-[10px]" name="question">
                      <div className="flex items-baseline justify-between">
                          <Form.Label className="text-[15px] font-medium leading-[35px]">Password
                          </Form.Label>
                          <Form.Message className="text-[13px] opacity-[0.8]" match="valueMissing">
                            Please enter your password
                          </Form.Message>
                      </div>
                      <Form.Control asChild>
                          <input
                              className="box-border w-full text-right bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                              // value={width !== null ? width : ''}
                              // onChange={ } 
                              autoComplete='off'
                              name="password"
                              type="password"
                              
                              />
                      </Form.Control>
                  </Form.Field>
                  
                  <Form.Submit asChild>
                      <button
                        type="submit"
                        formAction={login}
                        className="box-border w-full text-violet shadow-blackA4 hover:bg-purple-500 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-purple-800 text-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
                        Login
                      </button>
                  </Form.Submit>
                  
                  <OAuthForm /> 
              </Form.Root> 
 
              </Box> 
            </Flex> 
          </Box>

        
        </div>
      
      </main>
  
  
  </>
  
  )

}