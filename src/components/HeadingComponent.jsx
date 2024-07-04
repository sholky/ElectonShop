import React from 'react';

// icons
import { CiLocationOn, CiDeliveryTruck } from 'react-icons/ci';

function HeadingComponent() {
	return (
		<div className='container mx-auto flex flex-col md:flex-row justify-center items-center md:justify-between h-[90px] gap-[10px]'>
			<h3 className='text-blackTextColor'>
				Need help? Call us: (+98) 0234 456 789
			</h3>

			<div className='flex items-center gap-4'>
				<div className='flex items-center gap-[5px]'>
					<CiLocationOn color='black' size={25} />
					<span className='text-blackTextColor'>Our store</span>
				</div>
				<div className='flex items-center gap-[5px]'>
					<CiDeliveryTruck color='black' size={25} />
					<span className='text-blackTextColor'>
						Track your order
					</span>
				</div>
			</div>
		</div>
	);
}

export default HeadingComponent;
