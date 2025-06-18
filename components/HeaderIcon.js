import Link from 'next/link';

export default function HeaderIcon({ href, Icon, count, label }) {
  return (
    <Link href={href} className="relative group text-gray-600 hover:text-blue-600">
      <Icon className="text-xl" aria-hidden="true" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 text-xs bg-orange-500 text-white rounded-full px-1.5 py-0.5">
          {count}
        </span>
      )}
      <span className="sr-only">{label}</span>
    </Link>
  );
}
