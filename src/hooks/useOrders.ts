import { useEffect, useState } from "react"
import { OrderListItem } from "../models/order.model"
import { fetchOrder, fetchOrders } from "../api/order.api";

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderListItem[]>([]);
    // 자세히 보기
    const [selectedItemId, setselectedItemId] = useState<number | null>(null);

    useEffect(() => {
        fetchOrders().then((orders) => {
            setOrders(orders);
        });
    }, []);

    const selectOrderItem = (orderId: number) => {
        // 요청 방어 (자세히 버튼 계속 누르면 계속 들어가니까)
        if (orders.filter((item) => item.id === orderId)[0].detail) {
            setselectedItemId(orderId);
            return;
        }
        
        fetchOrder(orderId).then((orderDetail) => {
            // detail 정보 어디에 저장하면 좋을까 -> order.model.ts의 OrderListItem에 저장
            setselectedItemId(orderId);
            setOrders(
                orders.map((item) => {
                    if (item.id === orderId) {
                        return {
                            ...item,
                            detail: orderDetail,
                        };
                    }
                    return item;
                })
            );
        });
    };

    return { orders, selectedItemId, selectOrderItem };
};