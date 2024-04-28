import AdminLoginForm from "../components/AdminLoginForm";

export default function SignInForm() {
  return (
    <section className='flex min-h-screen items-center justify-center  text-black'>
      <div className='p-3 rounded-md w-[500px] bg-slate-100 shadow-xl'>
        <div className='p-2'>
          <img src='/images/logo.png' className='m-auto w-24' alt='logo' />
          <h2 className='mb-5 text-center text-2xl font-semibold'>Welcome to Bible Admin Panel</h2>
          <h2 className='mb-5 text-center text-lg font-semibold'>Admin Login</h2>
          <AdminLoginForm />
        </div>
      </div>
    </section>
  );
}
