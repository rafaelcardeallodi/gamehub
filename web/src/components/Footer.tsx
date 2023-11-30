import { Facebook, Instagram, Twitter } from 'lucide-react'
import { LogoFooter } from './LogoFooter'
import { LogoLine } from './LogoLine'

export function Footer() {
  return (
    <div
      className="relative mt-40 flex w-full px-8"
      style={{
        background:
          'linear-gradient(170deg, rgba(41, 43, 46, 0.00) 1.83%, rgba(6, 121, 255, 0.25) 95.52%), #161718 ',
      }}
    >
      <div className="z-2 relative mx-auto flex min-h-[422px] w-full max-w-screen-xl items-center gap-8">
        <div className="flex flex-1 flex-col gap-16">
          <LogoFooter />

          <p className="max-w-[742px] opacity-60">
            Explore o universo dos jogos e PCs conosco! Junte-se à nossa
            comunidade apaixonada, compartilhe suas experiências, descubra as
            últimas notícias e conecte-se com gamers de todo o mundo. Transforme
            sua paixão por jogos e tecnologia em uma jornada inesquecível.
          </p>

          <span className="opacity-30">
            Todos os direitos reservados ® 2023 - Feito com ❤ por{' '}
            <a
              href="https://www.linkedin.com/in/rafaelcardeallodi/"
              className="underline"
            >
              Rafael Lodi
            </a>
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="https://www.linkedin.com/in/rafaelcardeallodi/"
            className="flex h-10 w-10 items-center justify-center bg-blue-500"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/rafaelcardeallodi/"
            className="flex h-10 w-10 items-center justify-center bg-blue-500"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/rafaelcardeallodi/"
            className="flex h-10 w-10 items-center justify-center bg-blue-500"
          >
            <Twitter size={24} />
          </a>
        </div>
      </div>

      <LogoLine className="z-1 absolute bottom-0 left-0" />
    </div>
  )
}
