import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { deleteItemCartAction, setPriceHandler } from '../store/cartSlice';

function CartItemComponent({ item, index }) {
	const dispatch = useDispatch();

	function removeItemHandler() {
		dispatch(deleteItemCartAction(item));
	}
	return (
		<div className='grid grid-cols-4 place-items-center mt-[20px] relative border-b-2 pb-[10px] '>
			<div className='flex gap-[10px] items-center'>
				{/* img */}
				<img
					src={item.thumbnail}
					alt={item.title}
					className='hidden md:flex w-[100px] h-[100px] object-cover rounded-2xl'
				/>

				{/* property of product */}
				<div>
					<h2>{item.title}</h2>
					<p>{item.category}</p>
					<p>{item.stock}</p>
				</div>
			</div>
			<div>
				<p>${item.price}</p>
			</div>
			<div className='flex items-center'>
				<button 
                className='px-[8px] py-[4px] bg-slate-300 text-[18px]'
                onClick={() => dispatch(setPriceHandler({increment: 1, index}))}
                >
					+
				</button>
				<span className='px-[8px] py-[4px] bg-slate-300 text-[18px]'>
					{item.count}
				</span>
				<button 
                className='px-[8px] py-[4px] bg-slate-300 text-[18px]'
                onClick={() => dispatch(setPriceHandler({increment: -1, index}))}
                >
					-
				</button>
			</div>
			<div>
				{/* cartTotal */}${item.cartTotal}
			</div>
			{/* remove */}

			<RxCross2
				color='red'
				size={25}
				className='absolute right-[0px] top-[0px]'
				onClick={removeItemHandler}
			/>
		</div>
	);
}

export default CartItemComponent;
