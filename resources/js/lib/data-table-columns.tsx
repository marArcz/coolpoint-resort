
import { IRoom } from "@/types/models"
import { ColumnDef } from "@tanstack/react-table"
import { formatToCurrency } from "./utils"


export const roomTableColumns: ColumnDef<IRoom>[] = [
    {
        accessorKey: "image",
        header: "Room Image",
        cell: ({row}) => (
            <img src={row.getValue("image")} className=" size-24" alt="" />
        )
    },
    {
        accessorKey: "name",
        header: "Room Label",
    },
    {
        header: "Size",
        cell:({row}) => (
            <div>
                <p>{row.getValue('double_decks')} double decks</p>
                <p>{row.getValue('beds')} beds</p>
            </div>
        )
    },
    {
        accessorKey: "min_people",
        header: "Capacity",
        cell:({row}) => (
            <div>
                {row.getValue('min_people')} - {row.getValue('max_people')} people
            </div>
        )
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
            <div>{formatToCurrency(row.getValue('price'))}</div>
        )
    },
]
