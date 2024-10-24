import { randNumber, randPastDate, randProductCategory, randProductName } from "@ngneat/falso";
import { json } from "react-router-dom";

export function inventoryLoader() {
    // TODO fetch actuall data for the component here!
    const data: InventoryData[] = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            category: randProductCategory(),
            productName: randProductName(),
            purchaseDate: randPastDate().toISOString().split('T')[0] as InventoryData["purchaseDate"],
            quantity: randNumber({
                min: 0,
                max: 100
            }),
            sellingPrice: randNumber({
                min: 1,
                max: 1000
            }),
            status: randNumber({
                min: 0,
                max: 1
            })
                ? "available"
                : "out-of-stock",
            supplyId: randNumber({
                min: 1000,
                max: 9999
            }).toString()
        })
    }
    return json(data)
}