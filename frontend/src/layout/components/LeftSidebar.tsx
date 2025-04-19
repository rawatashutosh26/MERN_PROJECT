import { useMusicStore } from "@/stores/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { Home, Library, Search, Plus, Music } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LeftSidebar = () => {
	const { albums, isLoading, fetchAlbums } = useMusicStore();

	useEffect(() => {
		fetchAlbums();
	}, [fetchAlbums]);

	return (
		<aside className='h-full flex flex-col gap-6 p-6'>
			<div className='flex flex-col gap-6'>
				<Link to='/' className='flex items-center gap-2'>
					<img src='/logo.png' alt='Logo' className='w-8 h-8' />
					<span className='text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent'>
						Spotify Clone
					</span>
				</Link>

				<nav className='flex flex-col gap-2'>
					<Link
						to='/'
						className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/50 transition-colors'
					>
						<Home className='h-5 w-5 text-zinc-400' />
						<span className='text-sm font-medium'>Home</span>
					</Link>
					<Link
						to='/search'
						className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/50 transition-colors'
					>
						<Search className='h-5 w-5 text-zinc-400' />
						<span className='text-sm font-medium'>Search</span>
					</Link>
					<Link
						to='/library'
						className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/50 transition-colors'
					>
						<Library className='h-5 w-5 text-zinc-400' />
						<span className='text-sm font-medium'>Your Library</span>
					</Link>
				</nav>
			</div>

			<div className='flex-1 flex flex-col gap-4'>
				<div className='flex items-center justify-between'>
					<h2 className='text-sm font-semibold text-zinc-400'>Playlists</h2>
					<Button
						size='icon'
						variant='ghost'
						className='h-8 w-8 hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-300'
					>
						<Plus className='h-4 w-4' />
					</Button>
				</div>

				<div className='flex-1 overflow-y-auto'>
					{isLoading ? (
						<div>Loading...</div>
					) : (
						albums.map((album) => (
							<Link
								key={album._id}
								to={`/albums/${album._id}`}
								className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/50 transition-colors'
							>
								<div className='w-8 h-8 rounded bg-zinc-800 flex items-center justify-center'>
									<Music className='h-4 w-4 text-zinc-400' />
								</div>
								<div className='flex-1 min-w-0'>
									<div className='text-sm font-medium truncate'>{album.title}</div>
									<div className='text-xs text-zinc-400'>{album.artist}</div>
								</div>
							</Link>
						))
					)}
				</div>
			</div>
		</aside>
	);
};

export default LeftSidebar;
