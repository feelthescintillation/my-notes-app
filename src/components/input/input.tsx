import React, { useState } from 'react';

type EnterableInput = {
    onEnter: (val?: any) => void;
    validator?: RegExp;
};
export const EnterableInput = (props: EnterableInput) => {
    const [val, setVal] = useState('');
    const [valid, setValidty] = useState(true);
    const handleKeyDown = (event: { key: string }) => {
        if (event.key === 'Enter') {
            if (valid) {
                props.onEnter(val);
                setVal('');
            }
        }
    };

    const checkValidity = () => {
        setValidty(true);
        if (props.validator && new RegExp(props.validator).test(val)) {
            setValidty(false);
            return;
        }
    };

    return (
        <input
            type="text"
            onKeyDown={handleKeyDown}
            value={val}
            onChange={(event) => {
                setVal(event.target.value);
                checkValidity();
            }}
            style={valid ? {} : { border: '1px solid red' }}
        />
    );
};
