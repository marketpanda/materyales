import React, { createContext, useContext, useState } from "react";

interface FlyOutContextType {
    open: Boolean;
    setOpen: (value: Boolean) => void;
}

const initialContext: FlyOutContextType = {
    open: true,
    setOpen: () => {},
};

const FlyOutContext = createContext<FlyOutContextType>(initialContext);

export function FlyOut(props: React.PropsWithChildren<{}>): JSX.Element {
    const [open, setOpen] = useState<Boolean>(true);

    const toggleOpen = () => {
        setOpen(!open);
    };

    return (
        <FlyOutContext.Provider value={{ open, setOpen: toggleOpen }}>
            {props.children}
        </FlyOutContext.Provider>
    );
}

function Toggle(): JSX.Element {
    const { open, setOpen } = useContext(FlyOutContext);

    return (
        <div className="w-full bg-red-700">
            <button>Save</button>
        </div>
    );
}

FlyOut.Toggle = Toggle;
