import styled from "styled-components";
import Button from "../common/Button";
import { FaList, FaTh } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { QUERYSTIRNG } from "@/constants/querystring";
import { useEffect } from "react";

const viewOptions = [
    {
        value: 'list',
        icon: <FaList />
    },
    {
        value: 'grid',
        icon: <FaTh />
    },
];

export type ViewMode = 'grid' | 'list'

function BooksViewSwitcher() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const handleSwitch = (value: ViewMode) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(QUERYSTIRNG.VIEW, value);
        setSearchParams(newSearchParams);
    };

    // 초기값 체크해주기 위해 사용
    useEffect(() => {
        if (!searchParams.get(QUERYSTIRNG.VIEW)) {
            handleSwitch('grid');
        }
    }, []);

    return (
        <BooksViewSwitcherStyle>
            {viewOptions.map((option) => (
                <Button
                    key={option.value}
                    size="medium" 
                    scheme={searchParams.get(QUERYSTIRNG.VIEW) === option.value ? 'primary' : 'normal'}
                    onClick={() => handleSwitch(option.value as ViewMode)}
                >
                    {option.icon}
                </Button>
            ))}
        </BooksViewSwitcherStyle>
    );
};

const BooksViewSwitcherStyle = styled.div`
    display: flex;
    gap: 8px;
    svg {
        fill: white
    }
`;

export default BooksViewSwitcher;