'use client';
import "./page.css";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <>
      <div className='menuimg'>
        <img src="/menu.jpg" alt="" width='100%' height='36%' />
      </div>
      <section className='lapis'>
       <a href="/dashboard/perfil/alterar"><img src="/lapis.png" alt="" width='60%'/></a>
      </section>
   


      <section className="user">
<img src="/user.png" alt="" width='80%'/>
</section>
<section className='info'>
<ul>
  <p> <b>Nome de perfil</b></p>
  <p> perfil@gmail.com </p>
</ul>
<br />
<li className="descricao">
  <b>
            <span>Empreendedor</span>
            <span className="sep"> — </span>
            <span>agricultor</span>
            <span className="sep"> — </span>
            <span>23 anos</span>
            </b>
          </li>
</section>
<section>
  <button>
    <p>
      Plantações
    </p>
    <br />
    <p>8</p>
  </button>
   <button className='btn'>
    <p>
   Sensores
    </p>
    <br />
    <p>8</p>
  </button>
  <section className='img'>
  <img src="/mais.png" alt="" />
  </section>
</section>

    </>
  );
}