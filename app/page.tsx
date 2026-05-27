"use client";
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const StationPoint = ({ imgSrc, name, km }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="flex flex-col items-center my-32 w-full"
    >
      <img src={imgSrc} alt={name} className="w-56 h-56 object-contain mb-8" />
      <div className="bg-[#00C2CB] text-white px-10 py-4 rounded-full font-bold shadow-xl text-xl">
        {km} - {name}
      </div>
    </motion.div>
  );
};

export default function GreenSMGamification() {
  const containerRef = useRef(null);
  const [km] = useState(12);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const phoneScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.4]);
  const phoneRotateY = useTransform(scrollYProgress, [0, 0.5], [0, 360]);

  return (
    <div ref={containerRef} className="bg-white text-zinc-900 font-sans overflow-x-hidden min-h-[400vh]">
      
      <div className="fixed inset-0 z-0 opacity-20">
        <img src="/road.png" alt="Road" className="w-full h-full object-cover" />
      </div>

      <nav className="fixed w-full z-50 p-6 flex justify-between items-center backdrop-blur-md bg-white/80 border-b border-zinc-200">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <h1 className="text-xl font-black tracking-tighter text-[#00C2CB]">
            GREEN <span className="text-zinc-900">SM</span>
          </h1>
        </div>
        <div className="space-x-8 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          <a href="#" className="hover:text-[#00C2CB]">Thông tin</a>
          <a href="#" className="hover:text-[#00C2CB]">Đăng nhập</a>
          <a href="#" className="hover:text-[#00C2CB]">Kho quà</a>
        </div>
      </nav>

      <section className="relative z-10 h-screen flex flex-col items-center justify-center pt-20">
        <h1 className="text-center uppercase tracking-tight mb-10 text-zinc-900 leading-none">
          <span className="block text-8xl font-black">GOM KILÔMÉT</span>
          <span className="block text-[4rem] font-bold text-[#00C2CB] mt-4">ĐỔI QUÀ</span>
        </h1>
        <motion.div 
          style={{ scale: phoneScale, rotateY: phoneRotateY }}
          className="w-[260px] h-[500px] rounded-[3rem] border-4 border-zinc-200 bg-white shadow-2xl flex flex-col items-center justify-center overflow-hidden"
        >
          <img src="/app-xanh.png" alt="Giao diện App Xanh SM" className="w-full h-full object-cover" />
        </motion.div>
      </section>

      <section className="relative z-10 py-32 flex flex-col items-center">
        <StationPoint imgSrc="/carcharging.png" name="Mầm Xanh" km="10 KM" />
        <StationPoint imgSrc="/carcharging.png" name="Cây Lớn" km="30 KM" />
        <StationPoint imgSrc="/carcharging.png" name="Về Đích" km="50 KM" />
      </section>

      <section className="relative z-10 max-w-3xl mx-auto p-12 bg-zinc-100 rounded-[3rem] mb-20 shadow-xl border border-zinc-200">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-sm text-[#00C2CB] uppercase tracking-widest font-bold">Tài khoản Xanh</h2>
            <h1 className="text-3xl font-bold text-zinc-900">Gom Kilômét - Đổi Quà</h1>
          </div>
          <div className="bg-white px-6 py-3 rounded-full border border-zinc-200">
            <span className="text-[#00C2CB] font-bold text-lg">{km} KM XANH</span>
          </div>
        </header>

        <div className="bg-white p-10 rounded-3xl text-center mb-10 border border-zinc-200">
          <div className="text-7xl mb-6">🌳</div>
          <h3 className="text-2xl font-bold text-zinc-900">Cây Mầm Xanh</h3>
          <div className="w-full bg-zinc-100 h-4 rounded-full overflow-hidden mt-6">
            <div className="bg-[#00C2CB] h-full w-[60%]"></div>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-6 text-zinc-900">Kho Quà Chiến Lược</h3>
        <div className="grid grid-cols-2 gap-6">
          <button className="bg-white p-8 rounded-3xl border border-zinc-200 hover:border-[#00C2CB] transition">
            <p className="font-bold text-lg text-zinc-900">Voucher 20%</p>
            <p className="text-sm text-zinc-500 mt-2">Giá: 10 KM</p>
          </button>
          <button className="bg-[#00C2CB] p-8 rounded-3xl text-white font-bold text-lg hover:opacity-90 transition">
            Đổi Mũ Bảo Hiểm (50 KM)
          </button>
        </div>
      </section>

      <footer className="relative z-10 text-center pb-20 opacity-50">
        <p className="text-md font-semibold tracking-wide text-zinc-900">
            GREEN SM - DI CHUYỂN THÔNG MINH, VĂN MINH TRÊN MỌI HÀNH TRÌNH
        </p>
      </footer>
    </div>
  );
}