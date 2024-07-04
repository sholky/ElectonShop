import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CartItemComponent from '../components/CartItemComponent';
import country from '../constants/country';

function CartPage() {

	// valid copun is alphacode
	const [currentCopun, setCurrentCopun] = useState(null);

	// copun
	const coupon = useRef();


	function handleCoupon() {
		setCurrentCopun(coupon.current.value)

		// reset input
		coupon.current.value = ''
	}



	const {cart, totalPrice} = useSelector(state => state.cartStore);

	return <div className='px-[20px] lg:px-[0px]'>
		 <div className='mt-[20px] lg:mt-[50px]'>
			<div className="container mx-auto flex flex-col justify-between lg:flex-row gap-[10px]">
				{/* left side */}
				<div className='w-full lg:w-[70%]'>
					<div className='grid grid-cols-4 bg-lightBlue h-[60px] place-items-center'>
						<p>Product</p>
						<p>Price</p>
						<p>Quantity</p>
						<p>Subtotal</p>
					</div>

					{/* body content */}
					<div>
						{cart.length > 0 ? cart.map((item,index) => {
							return <CartItemComponent key={index} item={item} index={index} />
						}) : <p className='text-center text-2xl font-bold mt-[50px]'>Cart is empty</p>}
					</div>

				</div>

				{/* right side */}
				<div className='flex flex-col'>
					<div className='bg-lightBlue'>
					<h1 className='text-center text-2xl font-bold'>Total Price</h1>

				<p className='text-3xl text-center'>${currentCopun === 'alphacode' ? totalPrice / 2 : totalPrice}</p>
					</div>

					{/* copuns */}
					<div className='flex flex-col gap-[10px] mt-10'>
						<label className='text-[14px]'>Insert coupon for 50%</label>
						<input type="text" placeholder='Insert copun' className='p-[10px] border rounded-lg ' ref={coupon}/>
						<button className='bg-mainBlue text-whiteTextColor px-[20px] py-[10px] rounded-lg'
						onClick={handleCoupon}
						>Apply</button>
					</div>

				
					<div>
						<select className='w-full px-[8px] py-[4px] border border-slate-500 rounded-full bg-whiteTextColor mt-[20px]'>
							{country.map((el,index) => {
								return <option key={index} value={el.code}>{el.name}</option>
							})}
						</select>
					</div>

					<button className='bg-mainYellow text-whiteTextColor px-[20px] py-[10px] rounded-lg mt-[20px]'>Checkout</button>
				</div>
			</div>
		</div>
	</div>;
}

export default CartPage;
