import styled from "styled-components";
import { useCategory } from "../../hooks/useCategory";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTIRNG } from "../../constants/querystring";


function BooksFilter() {
    const { category } = useCategory();
    const [searchParams, setSearchParams] = useSearchParams();

    // category
    const handleCategory = (id: number | null) => {

        const newSearchParams = new URLSearchParams(searchParams);

        if (id === null) {  // 전체를 클릭했을 경우
            newSearchParams.delete(QUERYSTIRNG.CATEGORY_ID);
        } else { // 나머지 (동화 소설 사회 등)를 클릭했을 경우
            newSearchParams.set(QUERYSTIRNG.CATEGORY_ID, id.toString());
        }

        setSearchParams(newSearchParams);
    };

    // 신간
    const handleNews = () => {
        const newSearchParams = new URLSearchParams(searchParams);

        if (newSearchParams.get(QUERYSTIRNG.NEWS)) {
            newSearchParams.delete(QUERYSTIRNG.NEWS);
        } else {
            newSearchParams.set(QUERYSTIRNG.NEWS, 'true');
        }

        setSearchParams(newSearchParams);
    };

    return (
        <BooksFilterStyle>
            <div className="category">
                {category.map((item) => (
                    <Button 
                        size="medium" 
                        scheme={item.isActive ? 'primary' : 'normal'}
                        key={item.category_id} 
                        onClick={() => handleCategory(item.category_id)}
                    >
                        {item.category_name}
                    </Button>
                ))}
            </div>
            <div className="new">
                <Button 
                    size="medium" 
                    scheme={searchParams.get(QUERYSTIRNG.NEWS) ? 'primary' : 'normal'}
                    onClick={() => handleNews()}
                >
                    신간
                </Button>
            </div>
        </BooksFilterStyle>
    );
};

const BooksFilterStyle = styled.div`
    display: flex;
    gap: 24px;

    .category {
        display: flex;
        gap: 8px;
    }
`;

export default BooksFilter;