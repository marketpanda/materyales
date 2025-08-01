import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'

interface SelectProps {
    options: any[]
    value: any
    onChange: (value:string) => void 
}

     
export const SelectDropDown:React.FC<SelectProps> = ({
    options,
    value,
    onChange
}) => {
    return ( 
         <Select.Root value={value} onValueChange={onChange}>
            <Select.Trigger className='inline-flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded w-[100px] hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <Select.Value />
            <Select.Icon>
                <ChevronDownIcon />
            </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
            <Select.Content className='bg-white border border-gray-300 rounded shadow-md z-50'>
                <Select.ScrollUpButton className='flex items-center justify-center p-1 text-gray-500'>
                <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className='p-1'>
                {
                    options.map((option) => ( 
                    <Select.Item
                        key={option.id}
                        value={option.id}
                        className='cursor-pointer px-3 py-2 rounded hover:bg-gray-100 focus:bg-gray-200 flex items-center justify-between'
                    >
                        <Select.ItemText>{option.name}</Select.ItemText>
                        <Select.ItemIndicator>
                        <CheckIcon />
                        </Select.ItemIndicator>
                    </Select.Item>
                    ))
                }
                </Select.Viewport>
                <Select.ScrollDownButton className='flex items-center justify-center p-1 text-gray-500'>
                <ChevronDownIcon fontSize={1} />
                </Select.ScrollDownButton>
            </Select.Content>
            </Select.Portal>
        </Select.Root>
       
    )
}
 