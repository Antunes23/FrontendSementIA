'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
    /*SEGUNDA PAGINA */
  return (
    <>
      <div className='menuimg'>
        <img src="/menu.jpg" alt="" width='100%' height='36%' />
      </div>
      <section className='lapis'>
       <a href="/dashboard/perfil/alterar"> <img src="/lapis.png" alt="" width='60%'/></a>
      </section>

      <section className="user">
<img src="/user.png" alt="" width='80%'/>
</section>
    <h1 className='alterar'>Alterar Perfil</h1>

<section className='info2'>
<ul>
   <div>
          <input className="input"
            type="text"
            name="Nome de perfil"
            placeholder="Nome de perfil"
          />
        </div>
  <div>
          <input className="input"
            type="text"
            name="Email"
            placeholder="E-mail"
          />
        </div>
</ul>
<br />
<li className="descricao">
  <b>
            <div>
          <input className="input"
            type="text"
            name="Descrição"
            placeholder="Descrição"
            />
        </div>
            </b>
          </li>
            </section>

            <section>
          <button className='btn1'>
    Salvar Alterações
          </button>
          <button className='btn2'>
    Cancelar Alterações
          </button>
    </section>

    <section >
  <button className='btn3'>
    <p>
      Plantações
    </p>
    <br />
    <p>8</p>
  </button>
    <button className='btn4'>
    <p>
    Sensores
    </p>
    <br />
    <p>8</p>
  </button>
  <section className='img1'>
  <img src="/mais.png" alt="" />
  </section>

</section>


    </>
  );
}