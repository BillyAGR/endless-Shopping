import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import './styles.css'

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext)
    const { description, images, title, price } = context.productToShow || {}
    const imageUrl = images ? images[0] : ''

    return (
        <>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>
                    Detail
                </h2>
                <div>
                    <XMarkIcon
                        className='h-6 w-6 text-black cursor-pointer'
                        onClick={() => context.closeProductDetail()}
                    />
                </div>
            </div>
            <figure className='px-6'>
                {imageUrl &&
                    <img
                        className='w-full h-full rounded-lg'
                        src={imageUrl}
                        alt={title}
                    />}
            </figure>
            <p className='flex flex-col p-6'>
                <span className='font-medium text-2xl mb-2'>{price}</span>
                <span className='font-medium text-md'>{title}</span>
                <span className='font-light text-sm'>{description}</span>
            </p>
        </>
    )
}

export { ProductDetail }