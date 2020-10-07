import React from 'react';
import './list-item.scss';
export type listItemProps = {
    name: string;
    itemKey: string | number;
    clickHandler: (key?: any) => any;
    selected?: boolean;
    deleteClickHandler?: (key?: any) => any;
};
export function ListItem(props: listItemProps) {
    return (
        <div className={`list-item ${props.selected ? 'selected' : ''}`}>
            <div
                className="item"
                onClick={() => props.clickHandler(props.itemKey)}
                style={props?.selected ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
            >
                {props.name}
            </div>
            {props.deleteClickHandler && (
                <div
                    className="svg-icon svg-baseline close clickabe"
                    onClick={() => props.deleteClickHandler?.(props.itemKey)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
}
