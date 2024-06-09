import React from 'react'
import * as Form from '@radix-ui/react-form'

type ComputeParams = {
    length: number | null,
    width: number | null,
    area: number | null,
    handleLengthChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    handleWidthChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    handleAreaChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    estimateNow: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const FormCompute:React.FC<ComputeParams> = ({
    length,
    width,
    area,
    handleLengthChange,
    handleWidthChange,
    handleAreaChange,
    estimateNow
}) => {

   
    
    return (
    <div>
        <Form.Root className="w-full">
            <Form.Field className="grid mb-[10px]" name="email">
            <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px]">Length
                <span className='opacity-50'> (meters)</span>
                </Form.Label>
                <Form.Message className="text-[13px] opacity-[0.8]" match="valueMissing">
                Please enter a length in meters
                </Form.Message>
                {/* <Form.Message className="text-[13px]  opacity-[0.8]" match="typeMismatch">
                Please enter a valid length
                </Form.Message> */}
            </div>
            <Form.Control asChild>
                <input
                    className="box-border text-right w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                    value={length !== null ? length : ''}
                    onChange={handleLengthChange}
                    autoComplete='off'
                    required
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
                        value={width !== null ? width : ''}
                        onChange={handleWidthChange} 
                        autoComplete='off'
                         
                        />
                </Form.Control>
            </Form.Field>
            <Form.Field className="grid mb-[10px]" name="question">
                <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[15px] font-medium leading-[35px]">
                    Area
                    <span className='opacity-50'> (square meters)</span>
                    </Form.Label>
                    <Form.Message className="text-[13px] opacity-[0.8]" match="valueMissing">
                    Please enter area in meters
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input
                        className="box-border text-right w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                        value={area !== null ? area : ''}
                        onChange={handleAreaChange}
                        autoComplete='off'
                    />
                </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
            <button
                className="box-border w-full text-violet shadow-blackA4 hover:bg-purple-500 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-purple-800 text-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]"
                onClick={estimateNow}
                >
                Estimate
            </button>
            </Form.Submit>
        </Form.Root> 
    </div>
  )
}

export default FormCompute