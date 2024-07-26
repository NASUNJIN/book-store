import { useEffect, useState } from "react";
import { Category } from "../models/category.model";
import { fetchCategory } from "../api/category.api";
import { useLocation } from "react-router-dom";

export const useCategory = () => {
    const location = useLocation();
    const [category, setCategory] = useState<Category[]>([]);

    const setActive = () => {
        const params = new URLSearchParams(location.search);
        if (params.get('category_id')) {  // category_id가 있을 경우
            setCategory((prev) => {
                return prev.map((item) => {
                    return {
                        ...item,
                        isActive: item.category_id === Number(params.get('category_id'))
                    }
                });
            });
        } else {
            setCategory((prev) => {  // 전체를 클릭했을 경우 (category_id가 없는 경우)
                return prev.map((item) => {
                    return {
                        ...item,
                        isActive: false,
                    };
                });
            });
        }
    };

    useEffect(() => {
        fetchCategory()
            .then((category) => {
                if (!category) return;

                const categoryWithAll = [
                    {
                        category_id: null,
                        category_name: '전체'
                    },
                    ...category
                ];

                setCategory(categoryWithAll);
                setActive();
            })
            .catch((error) => {
                console.log('Fetch Category Error:', error);
            });
    }, []);

    useEffect(() => {
        setActive();
    }, [location.search]);

    return { category };
}