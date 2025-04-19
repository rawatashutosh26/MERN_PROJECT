import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";
import { PlaybackControls } from "./components/PlaybackControls";
import { useEffect, useState } from "react";

const MainLayout = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<div className='h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white flex flex-col'>
			<ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-4 gap-4'>
				<AudioPlayer />
				{/* left sidebar */}
				<ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
					<div className='h-full bg-zinc-900/50 backdrop-blur-md rounded-xl border border-zinc-800/50'>
						<LeftSidebar />
					</div>
				</ResizablePanel>

				<ResizableHandle className='w-1 bg-zinc-800/50 rounded-full transition-colors hover:bg-zinc-700/50' />

				{/* Main content */}
				<ResizablePanel defaultSize={isMobile ? 80 : 60}>
					<div className='h-full bg-zinc-900/50 backdrop-blur-md rounded-xl border border-zinc-800/50 overflow-hidden'>
						<Outlet />
					</div>
				</ResizablePanel>

				{!isMobile && (
					<>
						<ResizableHandle className='w-1 bg-zinc-800/50 rounded-full transition-colors hover:bg-zinc-700/50' />

						{/* right sidebar */}
						<ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
							<div className='h-full bg-zinc-900/50 backdrop-blur-md rounded-xl border border-zinc-800/50'>
								<FriendsActivity />
							</div>
						</ResizablePanel>
					</>
				)}
			</ResizablePanelGroup>

			<div className='p-4'>
				<div className='bg-zinc-900/50 backdrop-blur-md rounded-xl border border-zinc-800/50'>
					<PlaybackControls />
				</div>
			</div>
		</div>
	);
};
export default MainLayout;
