import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Logo from "../../assets/Logo.png";
import cart from "../../assets/cart.png"
import squareadd from "../../assets/squareadd.png"
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		// <ul>
		<div className='Nav-container'>
			<div className='Nav-bar'>
				<div className='Top-left-nav'>
					<NavLink exact to="/" className='Logo-link'>
						<img src={Logo} alt="Cat Logo" className='Logo'></img>
					</NavLink>
					<NavLink className="Home" exact to="/">PawCo</NavLink>
				</div>
				<div className='filler'></div>
				{sessionUser && (
					<div className='nav-width'>
						<div className='New-item'>
							<NavLink to="/items/new" activeClassName="active" className="Create-Link">
								<img src={squareadd} alt="squareadd Logo" className='Nav-square'></img>
							</NavLink>
							<NavLink to="/items/new" activeClassName="active" className="Create-words">
								Create new Item
							</NavLink>
						</div>

						<NavLink to="/user/cart" activeClassName="active">
							<img src={cart} alt="cart Logo" className='Nav-Cart'></img>
						</NavLink>

						<div className="about-me-container">
							<a href="https://github.com/RetepG" target="_blank" className='about-me'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png" className='about-me'></img></a>
						</div>

					</div>
				)}
				{!sessionUser && (
					<div className="about-me-container" style={{ width: '40%', display: 'flex', justifyContent: 'flex-end' }}>
						<a href="https://github.com/RetepG" target="_blank" className='about-me'>
							<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png" alt="GitHub Profile" className='about-me' />
						</a>
					</div>

				)}
				{isLoaded && (
					<li className='Profile'>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</div>
		</div>
		// </ul>
	);
}

export default Navigation;
