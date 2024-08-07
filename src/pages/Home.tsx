import Empty from "@/components/common/Empty";
import Loading from "@/components/common/Loading";
import Title from "@/components/common/Title";
import MainBest from "@/components/main/MainBest";
import MainNewBooks from "@/components/main/MainNewBooks";
import MainReview from "@/components/main/MainReview";
import { useMain } from "@/hooks/useMain";
import styled from "styled-components";
import { CiFaceFrown } from "react-icons/ci";
import Banner from "@/components/common/banner/Banner";

function Home() {
    const { reviews, newBooks, bestBooks, banners } = useMain();
    return (
        <HomeStyle>
            {/* 베너 */}
            <Banner banners={banners}/>

            {/* 베스트셀러 */}
            <section className="section">
                <Title size="large">베스트 셀러</Title>
                {/* 서버가 준비되어있지 않아 일단 보류 */}
                {/* <MainBest books={bestBooks} /> */}
                <Empty 
                    title="업데이트 중" 
                    icon={<Loading/>}
                    description={<>업데이트 중</>}
                />
            </section>

            {/* 신간 */}
            <section className="section">
                <Title size="large">신간안내</Title>
                {
                    newBooks.length > 0 ? (<MainNewBooks books={newBooks} />)
                    : (<Empty  title="신간 정보가 없습니다." icon={<CiFaceFrown color="#5f5f5f" />} />)
                }
                
            </section>

            {/* 리뷰 */}
            <section className="section">
                <Title size="large">리뷰</Title>
                <MainReview reviews={reviews}/>
            </section>
        </HomeStyle>
    );
};

const HomeStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export default Home;