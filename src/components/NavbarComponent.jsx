import React from 'react';
import HeadingComponent from './HeadingComponent';

// logo
import logo from '../assets/logo.png';

// icons
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import CategoryComponent from './CategoryComponent';
import { useSelector } from 'react-redux';

function NavbarComponent() {

	const {totalProduct} = useSelector(state => state.cartStore);
	const {favoriteTotal} = useSelector(state => state.favoriteStore);



	return (
		<div className=''>
			<HeadingComponent />
			<nav className='bg-mainBlue h-full lg:h-[100px] py-[20px]'>
				<div className='container mx-auto flex flex-col lg:flex-row items-center h-full justify-between gap-[20px]'>
					{/* logotip */}
					<Link to='/'>
						<img src={logo} alt='logo' />
					</Link>

					{/* search bar */}
					<div className='bg-whiteTextColor rounded-[20px]'>
						<input
							type='text'
							placeholder='Search product'
							className='bg-transparent outline-none px-[25px] py-[17px]'
						/>
						<button className='bg-mainYellow text-whiteTextColor px-[25px] py-[17px] rounded-[20px]'>
							Search
						</button>
					</div>

					{/* links */}
					<div>
						<ul className='flex-center gap-[20px]'>
							<li className='flex-center'>
								
								<SignedOut>
									<SignInButton />
								</SignedOut>
								<SignedIn>
									<UserButton afterSignOutUrl='/' showName={true} appearance={{
										elements: {
											avatarBox: 'w-[40px] h-[40px]'
										},
										variables: {
											colorText: '#f90'
										}
									}}/>
								</SignedIn>
							</li>
							<li className='flex-center gap-[10px]'>
								<div className='flex-center'>
									<CiHeart color='white' size={25} />
									<span className='badge'>{favoriteTotal}</span>
								</div>
								<Link to={'/favorite'} className='text-whiteTextColor'>
									Favorite
								</Link>
							</li>
							<li className='flex-center gap-[10px]'>
								<div className='flex-center'>
									<CiShoppingCart color='white' size={25} />
									<span className='badge'>{totalProduct}</span>
								</div>
								<Link to={'/cart'} className='text-whiteTextColor'>
									Cart
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<CategoryComponent />
			
		</div>
	);
}

export default NavbarComponent;
