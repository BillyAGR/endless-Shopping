import { ShoppingBagIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { NavLink } from 'react-router-dom'
import { routes } from './Routes.jsx'

const Navbar = () => {
    const {
        cartProducts,
        setSearchByCategory,
        openProductDetail,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        closeProductDetail,
        displayMode,
        setDisplayMode,
        account,
        signOut
    } = useContext(ShoppingCartContext)

    const routesA = routes.filter(route => route.section === 1)
    const routesB = routes.filter(route => route.section === 2)
    const activeStyle = 'underline underline-offset-4'
    const inactiveStyle = 'hover:bg-gray-200 rounded-full p-1'

    const handleProductClick = () => {
        (isCheckoutSideMenuOpen) ? (closeCheckoutSideMenu(), closeProductDetail()) : (openCheckoutSideMenu(), openProductDetail())
        setDisplayMode('hidden')
    }

    const toggleDisplayMode = () => {
        setDisplayMode(prevMode => (prevMode === 'hidden' ? 'flex' : 'hidden'))
        closeCheckoutSideMenu()
        closeProductDetail()
    }

    const renderNavLink = (route, onClick) => (
        <li key={route.to} className={route.to === '/' ? 'font-semibold text-lg' : ''} onClick={onClick}>
            <NavLink
                to={route.to}
                className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
            >
                {route.title}
            </NavLink>
        </li>
    )

    const renderShopping = (display, ml) => (
        <li className={`${display} items-center ${ml} cursor-pointer lg:flex`} onClick={(e) => handleProductClick(e)}>
            <ShoppingBagIcon className='h-6 w-6 text-black' />
            <div>{cartProducts.length}</div>
        </li>
    )
    const renderRoutes = (route) => {
        if ((route.isPrivate && signOut) || !route.isPrivate) {
            const handleClick = route.to === '/sign-in'
                ? () => {
                    toggleDisplayMode()
                }
                : () => toggleDisplayMode()

            return renderNavLink(route, handleClick)
        }
    }

    return (
        <nav>
            <div className='flex justify-between items-center fixed z-30 top-0 w-full py-5 px-8 text-sm font-light bg-white lg:hidden'>
                <ul className='flex w-full'>
                    <li>
                        <Bars3Icon
                            className='h-6 w-6 cursor-pointer'
                            onClick={() => toggleDisplayMode()}
                        />
                    </li>
                    {renderShopping('flex', 'ml-auto')}
                </ul>
            </div>
            <div className={`${displayMode} flex-col justify-between items-center fixed top-0 z-50 w-50 h-full py-5 px-8 text-sm font-light bg-gray-100 rounded-lg
            lg:top-0 lg:flex lg:flex-row lg:w-full lg:h-auto lg:bg-white`}>
                <ul className='flex flex-col items-start gap-3 lg:flex-row lg:items-center'>
                    {routesA.map(route => renderNavLink(route, route.to === '/' ? () => (setSearchByCategory(null), toggleDisplayMode()) : () => (setSearchByCategory(route.title), toggleDisplayMode())))}
                </ul>
                <ul className='flex flex-col gap-3 py-12 lg:flex-row lg:justify-center lg:py-0'>
                    <li className='text-black/60'>{signOut && account?.email}</li>
                    {routesB.map(route => renderRoutes(route))}
                    {renderShopping('hidden', '')}
                </ul>
            </div>
        </nav>
    )
}

export { Navbar }
