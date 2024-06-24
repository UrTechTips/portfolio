// hooks/useLoadAssets.ts
"use client";
import React, { useState, useEffect } from "react";
import Loading from "@/components/Loading/loading.component";

interface AssetsProps {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	assets: string[];
	onAssetsLoaded: () => void;
}

const useLoadAssets: React.FC<AssetsProps> = ({ isLoading, setIsLoading, assets, onAssetsLoaded }) => {
	const [loadedCount, setLoadedCount] = useState(0);

	useEffect(() => {
		const loadAsset = async (url: string) => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Failed to load ${url}`);
				}
				await response.text(); // Or process the asset data as needed
				setLoadedCount(loadedCount + 1);
			} catch (error) {
				console.error(`Error loading asset ${url}:`, error);
			} finally {
				if (loadedCount === assets.length) {
					setIsLoading(false);
					onAssetsLoaded();
				}
			}
		};

		Promise.all(assets.map(loadAsset)).catch((error) => {
			console.error("Error loading assets:", error);
			setIsLoading(false); // Handle loading errors gracefully
		});
	}, []);

	return null;
};

export default useLoadAssets;
