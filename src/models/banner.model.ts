export interface Banner {
    id: number;
    title: string;
    description: string;
    image: string;
    url: string;  // 배너 클릭했을 때 이동 할 url
    target: string;  // url과 함께 따라다님
};