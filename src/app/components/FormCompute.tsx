import React from 'react'
import * as Form from '@radix-ui/react-form'
import { Dimensions } from '../materials/[material]/page'

type ComputeParams = {
    material?: string | null, 
    length: number | null,
    width: number | null,
    area: number | null,
    handleParamsChange?: (e:React.ChangeEvent<HTMLInputElement>, params:keyof Dimensions ) => void,
    handleLengthChange?: (e:React.ChangeEvent<HTMLInputElement>) => void,
    handleWidthChange?: (e:React.ChangeEvent<HTMLInputElement>, params:keyof Dimensions ) => void,
    handleAreaChange?: (e:React.ChangeEvent<HTMLInputElement>) => void,
    handleDirectAreaChange?: (e:React.ChangeEvent<HTMLInputElement>) => void,
    estimateNow?: (e:React.FormEvent<HTMLElement>) => void,  
}

const FormCompute:React.FC<ComputeParams> = ({ 
    material,
    length,
    width,
    area, 
    handleParamsChange,
    handleDirectAreaChange,
    estimateNow
}) => { 
 
    
    return (
    <div>
        <Form.Root className="w-full" onSubmit={(e) => estimateNow?.(e)}>
            <div>Let's compute for { material ? material : '' }</div>
            <Form.Field className="grid mb-[10px]" name="email">
            <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px]">Length
                <span className='opacity-50'> (meters)</span>
                </Form.Label>
                <Form.Message className="text-[13px] opacity-[0.8]" match="valueMissing">
                    Please enter a length in meters
                </Form.Message>
            </div>
            <Form.Control asChild>
                <input
                    className="box-border text-right w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                    value={length || ""}
                    onChange={(e) => handleParamsChange && handleParamsChange(e, 'length')} 
                    autoComplete='off' 
                />
            </Form.Control>
            </Form.Field>
            <Form.Field className="grid mb-[10px]" name="question">
                <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[15px] font-medium leading-[35px]">
                        Width
                    <span className='opacity-50'> (meters)</span>
                    </Form.Label>
                    <Form.Message className="text-[13px] opacity-[0.8]" match="valueMissing">
                        Please enter a width in meters
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input
                        className="box-border w-full text-right bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                        value={width || ""}
                        onChange={(e) => handleParamsChange && handleParamsChange(e, 'width')} 
                        autoComplete='off'
                    />
                </Form.Control>
            </Form.Field>
            <Form.Field className="grid mb-[10px]" name="question">
                <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[15px] font-medium leading-[35px]">
                    Area
                    <span className='opacity-50'>(square meters)</span>
                    </Form.Label>
                    <Form.Message className="text-[13px] opacity-[0.8]" match="valueMissing">
                    Please enter area in meters
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input
                        className="box-border text-right w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                        value={area || ""}
                        onChange={(e) => handleDirectAreaChange && handleDirectAreaChange(e)}
                        autoComplete='off'
                    />
                </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
                <button
                    className="box-border w-full text-violet shadow-blackA4 hover:bg-purple-500 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-purple-800 text-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]"
                    role='submit'
                    >
                    Estimate
                </button>
            </Form.Submit>
        </Form.Root> 
    </div>
  )
}

export default FormCompute