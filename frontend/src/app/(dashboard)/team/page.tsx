import Image from 'next/image'
import { ImageIcon } from 'lucide-react'

// Replace with the real RMIT Redbacks Robocup roster.
// image: path under /public, e.g. '/team/jane-doe.jpg'. Leave null until you have a photo.
const TEAM_MEMBERS = [
  { name: 'Jariah Alam', role: 'PM', bio: 's3986116@student.rmit.edu.au', image: '/team/Jariah.jpg' },
  { name: 'Mohammed Falah', role: 'Dev', bio: 's4096486@student.rmit.edu.au', image: null },
  { name: 'Jordan Nguyen', role: 'Dev', bio: 'S4030581@rmit.edu.vn', image: '/team/Jordan.jpg' },
  { name: 'Jaskaran Singh .', role: 'UX', bio: 's4089250@student.rmit.edu.au', image: '/team/Jaskaran.jpg' },
  { name: 'Sayed Isfaque Ahmed Anan', role: 'BA', bio: 's3986132@student.rmit.edu.au', image: '/team/Sayed.jpg' },
]

export default function TeamPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-10 pb-20">
      <div className="space-y-2 text-center">
        <h1 className="font-serif text-4xl font-bold text-zinc-900 sm:text-5xl">Meet the Team</h1>
        <p className="text-sm text-zinc-500">RMIT Redbacks Robocup team!</p>
      </div>

     <div className="mt-12 flex flex-wrap justify-center gap-5">
        {TEAM_MEMBERS.map((member, index) => (
        <div
            key={index}
            className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm w-48"
          >
            <div className="relative flex aspect-square items-center justify-center bg-zinc-200">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 16vw, 33vw"
                />
              ) : (
                <ImageIcon className="h-10 w-10 text-zinc-300" strokeWidth={1.5} />
              )}
            </div>
            <div className="flex-1 space-y-1 px-4 py-4">
              <p className="text-sm font-semibold text-zinc-900">{member.name}</p>
              <p className="text-sm font-medium text-[#c1524c]">{member.role}</p>
              <p className="text-xs leading-snug text-zinc-400">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}