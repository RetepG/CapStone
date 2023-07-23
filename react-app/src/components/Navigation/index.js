import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Logo from "../../assets/Logo.png";
import cart from "../../assets/cart.png"
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<ul>
			<div className='Nav-container'>
				<div className='Nav-bar'>
					<div className='Top-left-nav'>
						<NavLink exact to="/" className='Logo-link'>
							<img src={Logo} alt="Cat Logo" className='Logo'></img>
						</NavLink>
						<NavLink className="Home" exact to="/">PawCo</NavLink>
					</div>
					{sessionUser && (
						<li>
							<NavLink to="/items/new" activeClassName="active" className="Create-Link">
								Create a New Item
							</NavLink>

							<NavLink to="/user/cart" activeClassName="active">
								<img src={cart} alt="cart Logo" className='Nav-Cart'></img>
							</NavLink>
						</li>
					)}
					{isLoaded && (
						<li className='Profile'>
							<ProfileButton user={sessionUser} />
						</li>
					)}
				</div>
			</div>
		</ul>
	);
}

export default Navigation;
