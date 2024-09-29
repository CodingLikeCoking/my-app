"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChevronDown, Menu, Search, User, X, MessageSquare, ThumbsUp } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { LatLngExpression } from 'leaflet'
import debounce from 'lodash.debounce'
import { useMap } from 'react-leaflet';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false })

// Dynamic Marker component
function DynamicMarker({ position, icon }: { position: LatLngExpression; icon: any }) {
  const map = useMap();

  useEffect(() => {
    if (map && map.flyTo) {
      map.flyTo(position); // Smooth transitions
    }
  }, [map, position]);

  return <Marker position={position} icon={icon} />;
}

// Function to geocode using OpenStreetMap Nominatim API
const geocode = async (query: string): Promise<LatLngExpression> => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
  const data = await response.json()
  if (data && data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)]
  }
  throw new Error('Location not found')
}

// Extract SpotCard component for popular spots
const SpotCard = ({ name, image }: { name: string, image: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
      <Image
        src={image}
        alt={name}
        width={100}
        height={100}
        className="object-contain"
      />
    </div>
    <p className="mt-2 text-center text-gray-300">{name}</p>
  </div>
);

// Extract PostCard component for posts
const PostCard = ({ post }: { post: any }) => (
  <div key={post.id} className="bg-gray-800 rounded-lg shadow-md p-4">
    <div className="flex items-center mb-2">
      <Image
        src={post.user.avatar}
        alt={post.user.name}
        width={40}
        height={40}
        className="rounded-full mr-2"
        loading="lazy"
      />
      <div>
        <p className="font-semibold text-gray-100">{post.user.name}</p>
        <p className="text-sm text-gray-400">{post.timestamp}</p>
      </div>
    </div>
    <p className="mb-2 text-gray-300">{post.content}</p>
    <Image
      src={post.image}
      alt="Post image"
      width={200}
      height={200}
      className="rounded-lg mb-2"
      loading="lazy"
    />
    <div className="flex items-center text-sm text-gray-400">
      <ThumbsUp className="w-4 h-4 mr-1" />
      <span className="mr-4">{post.recommendations} 推薦</span>
      <MessageSquare className="w-4 h-4 mr-1" />
      <span>{post.comments} 留言</span>
    </div>
  </div>
);

export function CheckInFirstComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([22.3193, 114.1694]); // Default to Hong Kong
  const [zoom, setZoom] = useState(11);
  const [error, setError] = useState<string | null>(null);
  const [customIcon, setCustomIcon] = useState<any>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        setCustomIcon(
          new L.Icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        );
      });
    }
  }, []);
  // Debounce the handle search function to avoid excessive geocoding calls
  const handleSearch = useCallback(
    debounce(async (query) => {
      setError(null);
      try {
        const location = await geocode(query);
        setMapCenter(location);
        setZoom(14);
      } catch (err) {
        console.error(err);
        setError('Location not found. Please try a different search.');
      }
    }, 500),
    []
  );

  const popularSpots = [
    { name: '派對房間', image: 'images/partyroom.jpg' },
    { name: '網球聚會', image: 'images/tennis.jpg' },
    { name: '劇本殺', image: 'images/script.jpg' },
    { name: '桌遊咖啡廳', image: 'images/boardgame.jpg' },
    { name: '密室逃脫', image: 'images/escape.jpg' },
    { name: 'K歌之夜', image: 'images/karaoke.jpg' },
  ];


  const posts = [
    {
      id: 1,
      user: { name: 'Alex', avatar: 'images/user.png' },
      timestamp: '2024-09-29 16:06',
      content: '今晚在旺角有超棒的派對房間活動！有人想一起來嗎？音樂、遊戲、小吃應有盡有...',
      image: 'images/partyroom_user.jpg',
      recommendations: 15,
      comments: 7,
    },
    {
      id: 2,
      user: { name: 'Sarah', avatar: '/images/user.png' },
      timestamp: '2024-09-29 15:44',
      content: '週末在維多利亞公園有網球聚會，歡迎各位球友來切磋球技！初學者也可以來學習哦～',
      image: 'images/partyroom_user.jpg',
      recommendations: 8,
      comments: 3,
    },
    {
      id: 3,
      user: { name: 'Jason', avatar: 'images/user.png' },
      timestamp: '2024-09-29 15:31',
      content: '尖沙咀新開了一家超讚的劇本殺店！昨晚去玩了《無間道》主題，真的很刺激！推薦給大家～',
      image: 'images/partyroom_user.jpg',
      recommendations: 20,
      comments: 12,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <img
                  className="h-10 w-auto"
                  src={'images/logo.jpg'}
                  alt="Check-in First"
                />
              </Link>
            </div>
            <nav className="hidden md:flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-orange-500">優惠活動</Link>
              <Link href="#" className="text-gray-300 hover:text-orange-500">我的日記</Link>
              <div className="relative group">
                <Link href="#" className="text-gray-300 hover:text-orange-500 flex items-center">
                  我的技能樹
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <Link href="#" className="text-gray-300 hover:text-orange-500">聚會活動</Link>
              <div className="relative group">
                <Link href="#" className="text-gray-300 hover:text-orange-500 flex items-center">
                  關於我們
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </nav>
            <div className="hidden md:flex items-center">
              <Button variant="ghost" className="text-gray-300 hover:text-orange-500">
                <User className="mr-2 h-4 w-4" />
                註冊 / 登入
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden text-gray-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4 shadow-md">
          <nav className="flex flex-col space-y-2">
            <Input
              type="text"
              placeholder="搜尋"
              className="mb-2 bg-gray-700 text-gray-100 border-gray-600"
            />
            <Link href="#" className="text-gray-300 hover:text-orange-500">優惠活動</Link>
            <Link href="#" className="text-gray-300 hover:text-orange-500">我的日記</Link>
            <Link href="#" className="text-gray-300 hover:text-orange-500">我的技能樹</Link>
            <Link href="#" className="text-gray-300 hover:text-orange-500">聚會活動</Link>
            <Link href="#" className="text-gray-300 hover:text-orange-500">關於我們</Link>
            <Button variant="outline" className="w-full text-gray-300 border-gray-600 hover:bg-gray-700">註冊 / 登入</Button>
          </nav>
        </div>
      )}

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-full max-w-[700px] mx-auto space-y-4">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery); }} className="flex items-center w-full">
              <Input
                type="text"
                placeholder="搜尋附近的優惠活動..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow mr-2 bg-gray-700 text-gray-100 border-gray-600"
              />
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Search className="mr-2 h-4 w-4" />
                搜尋
              </Button>
            </form>
            {error && <p className="text-red-400 mt-2">{error}</p>}
            <div className="h-[500px] w-full relative overflow-hidden rounded-lg shadow-lg">
              <MapContainer
                center={mapCenter}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                ref={mapRef}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {customIcon && <DynamicMarker position={mapCenter} icon={customIcon} />}
              </MapContainer>
            </div>
          </div>
        </div>

        <section className="py-12 px-4 bg-gradient-to-r from-gray-800 to-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">為你推薦：附近的聚會活動</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {popularSpots.map((spot, index) => (
                <SpotCard key={index} name={spot.name} image={spot.image} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">最新貼文</h2>
            <Tabs defaultValue="latest" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-4 bg-gray-800">
                <TabsTrigger value="latest" className="data-[state=active]:bg-gray-700">最新</TabsTrigger>
                <TabsTrigger value="popular" className="data-[state=active]:bg-gray-700">熱門</TabsTrigger>
                <TabsTrigger value="private" className="data-[state=active]:bg-gray-700">私密</TabsTrigger>  {/* Fixed closing tag */}
                <TabsTrigger value="friends" className="data-[state=active]:bg-gray-700">好友</TabsTrigger>
                <TabsTrigger value="following" className="data-[state=active]:bg-gray-700">追蹤</TabsTrigger>
                <TabsTrigger value="saved" className="data-[state=active]:bg-gray-700">收藏</TabsTrigger>
              </TabsList>
              <TabsContent value="latest">
                <div className="space-y-6">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

          </div>
        </section>
      </main >

      <footer className="bg-gray-800 py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 Check-in First. All rights reserved.</p>
          <nav className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-orange-500">Terms</Link>
            <Link href="#" className="text-gray-400 hover:text-orange-500">Privacy</Link>
            <Link href="#" className="text-gray-400 hover:text-orange-500">Contact</Link>
          </nav>
        </div>
      </footer>
    </div >
  )
}