import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

export default function Nav() {

  return (
    <div className='Nav'>
        <div className='pagetitle'>
        <Link className='PageTitle' to='/'>Tick-It!</Link>
        <Link className='nav'></Link>
      </div>
    </div>
  )
}