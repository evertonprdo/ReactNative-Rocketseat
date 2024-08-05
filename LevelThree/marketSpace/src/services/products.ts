import { FileImageProps, PaymentMethodsProps } from "src/@types/FormProps"
import { api } from "./api"
import { ProductDTO, UserProductDTO } from "@dtos/ProductsDTO"

const prefix = "/products"

export type PostProductProps = {
    name: string
    description: string
    is_new: boolean
    price: number
    accept_trade: boolean
    payment_methods: Array<keyof PaymentMethodsProps>
}

export async function postProduct(product: PostProductProps) {
    try {
        const { data } = await api.post<{id: string}>(prefix, product)
        return data
    } catch (error) {
        throw error
    }
}

export async function postProductImages(images: FileImageProps[], id: string) {
    try {
        const productImagesForm = new FormData();

        productImagesForm.append("product_id", id)
        images.map(img => productImagesForm.append("images", img as any))

        api.post(`${prefix}/images`, productImagesForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error) {
        throw error
    }
}

export async function getUserProducts() {
    try {
        const { data } = await api.get<UserProductDTO[]>(`/users${prefix}`)
        return data
    } catch (error) {
        throw error
    }
}

export async function getProductById(id: string) {
    try {
        const { data } = await api.get<ProductDTO>(`${prefix}/${id}`)
        return data
    } catch (error) {
        throw error
    }
}