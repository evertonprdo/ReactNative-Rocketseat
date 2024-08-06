import { FileImageProps } from "src/@types/FormProps"
import { api } from "./api"
import { ProductDTO, UserProductDTO } from "@dtos/ProductsDTO"

const prefix = "/products"

export type PostProductProps = {
    name: string
    description: string
    is_new: boolean
    price: number
    accept_trade: boolean
    payment_methods: string[]
    is_active: boolean
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
        images.map(img => productImagesForm.append("images", {
            name: img.name,
            uri: img.path,
            type: img.type
        } as any))

        api.post(`${prefix}/images`, productImagesForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error) {
        throw error
    }
}


export async function deleteProductImages(imageIds: string[]) {
    try {
        await api.delete(`${prefix}/images`, { data: {productImagesIds: imageIds} })
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

type SearchParamsProps = {
    query?: string
    accept_trade?: boolean
    is_new?: boolean
    payment_methods?: string[]
}
export async function getProducts(params?: SearchParamsProps) {
    try {
        const { data } = await api.get<ProductDTO[]>(prefix, { params })
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

export async function patchProductById(id: string, is_active: boolean) {
    try {
        await api.patch(`${prefix}/${id}`, {is_active})
    } catch (error) {
        throw error
    }
}

export async function deleteProductById(id: string) {
    try {
        await api.delete(`${prefix}/${id}`)
    } catch (error) {
        throw error
    }
}

export async function putProductById(id: string, params: PostProductProps) {
    try {
        await api.put(`${prefix}/${id}`, params)
    } catch (error) {
        throw error
    }
}