import { useState, useEffect, useRef } from 'react'

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const [scrollRevealed, setScrollRevealed] = useState(1) // Track which models are revealed by scroll, default to 1
  const designSectionRef = useRef(null)
  
  // Geometric design states
  const [geometricMousePosition, setGeometricMousePosition] = useState({ x: 0, y: 0 })
  const [geometricSmoothPosition, setGeometricSmoothPosition] = useState({ x: 0, y: 0 })
  const geometricContainerRef = useRef(null)
  const geometricAnimationFrameRef = useRef(null)
  
  // Orbital design states
  const [orbitalMousePosition, setOrbitalMousePosition] = useState({ x: 0, y: 0 })
  const [orbitalSmoothPosition, setOrbitalSmoothPosition] = useState({ x: 0, y: 0 })
  const orbitalContainerRef = useRef(null)
  const orbitalAnimationFrameRef = useRef(null)
  
  // Sphere design states
  const [sphereMousePosition, setSphereMousePosition] = useState({ x: 0, y: 0 })
  const [sphereSmoothPosition, setSphereSmoothPosition] = useState({ x: 0, y: 0 })
  const sphereContainerRef = useRef(null)
  const sphereAnimationFrameRef = useRef(null)
  
  // Handle button clicks
  const handleButtonClick = (buttonIndex) => {
    if (activeButton === buttonIndex) {
      setActiveButton(null) // Toggle off if already active
    } else {
      setActiveButton(buttonIndex)
    }
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Smooth mouse following for geometric design
  useEffect(() => {
    const updateSmoothPosition = () => {
      setGeometricSmoothPosition(prev => {
        const lagFactor = 0.12
        const dx = (geometricMousePosition.x - prev.x) * lagFactor
        const dy = (geometricMousePosition.y - prev.y) * lagFactor
        
        return {
          x: prev.x + dx,
          y: prev.y + dy
        }
      })
      
      geometricAnimationFrameRef.current = requestAnimationFrame(updateSmoothPosition)
    }

    geometricAnimationFrameRef.current = requestAnimationFrame(updateSmoothPosition)
    
    return () => {
      if (geometricAnimationFrameRef.current) {
        cancelAnimationFrame(geometricAnimationFrameRef.current)
      }
    }
  }, [geometricMousePosition])

  // Smooth mouse following for orbital design
  useEffect(() => {
    const updateOrbitalSmoothPosition = () => {
      setOrbitalSmoothPosition(prev => {
        const lagFactor = 0.15
        const dx = (orbitalMousePosition.x - prev.x) * lagFactor
        const dy = (orbitalMousePosition.y - prev.y) * lagFactor
        
        return {
          x: prev.x + dx,
          y: prev.y + dy
        }
      })
      
      orbitalAnimationFrameRef.current = requestAnimationFrame(updateOrbitalSmoothPosition)
    }

    orbitalAnimationFrameRef.current = requestAnimationFrame(updateOrbitalSmoothPosition)
    
    return () => {
      if (orbitalAnimationFrameRef.current) {
        cancelAnimationFrame(orbitalAnimationFrameRef.current)
      }
    }
  }, [orbitalMousePosition])

  // Smooth mouse following for sphere design
  useEffect(() => {
    const updateSphereSmoothPosition = () => {
      setSphereSmoothPosition(prev => {
        const lagFactor = 0.12
        const dx = (sphereMousePosition.x - prev.x) * lagFactor
        const dy = (sphereMousePosition.y - prev.y) * lagFactor
        
        return {
          x: prev.x + dx,
          y: prev.y + dy
        }
      })
      
      sphereAnimationFrameRef.current = requestAnimationFrame(updateSphereSmoothPosition)
    }

    sphereAnimationFrameRef.current = requestAnimationFrame(updateSphereSmoothPosition)
    
    return () => {
      if (sphereAnimationFrameRef.current) {
        cancelAnimationFrame(sphereAnimationFrameRef.current)
      }
    }
  }, [sphereMousePosition])

  // Mouse tracking for geometric design
  const handleGeometricMouseMove = (e) => {
    if (!geometricContainerRef.current) return
    
    const rect = geometricContainerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    
    if (distance < 400) {
      setGeometricMousePosition({
        x: deltaX * 0.25,
        y: deltaY * 0.25
      })
    } else {
      setGeometricMousePosition({ x: 0, y: 0 })
    }
  }

  const handleGeometricMouseLeave = () => {
    setGeometricMousePosition({ x: 0, y: 0 })
  }

  // Mouse tracking for orbital design
  const handleOrbitalMouseMove = (e) => {
    if (!orbitalContainerRef.current) return
    
    const rect = orbitalContainerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    
    const maxDistance = 80
    
    if (distance > 0) {
      const limitedDistance = Math.min(distance, maxDistance)
      const scale = limitedDistance / distance
      
      setOrbitalMousePosition({
        x: deltaX * 0.3 * scale,
        y: deltaY * 0.3 * scale
      })
    } else {
      setOrbitalMousePosition({ x: 0, y: 0 })
    }
  }

  const handleOrbitalMouseLeave = () => {
    setOrbitalMousePosition({ x: 0, y: 0 })
  }

  // Mouse tracking for sphere design
  const handleSphereMouseMove = (e) => {
    if (!sphereContainerRef.current) return
    
    const rect = sphereContainerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    
    if (distance < 400) {
      setSphereMousePosition({
        x: deltaX * 0.25,
        y: deltaY * 0.25
      })
    } else {
      setSphereMousePosition({ x: 0, y: 0 })
    }
  }

  const handleSphereMouseLeave = () => {
    setSphereMousePosition({ x: 0, y: 0 })
  }

  // Scroll detection for sequential model reveal with smooth staggered animations
  useEffect(() => {
    const handleScroll = () => {
      if (!designSectionRef.current || activeButton !== null) return
      
      const sectionTop = designSectionRef.current.offsetTop
      const sectionHeight = designSectionRef.current.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollY = window.scrollY
      
      // Calculate when section enters viewport
      const sectionEnterPoint = sectionTop - viewportHeight
      const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionEnterPoint) / (sectionHeight + viewportHeight)))
      
      // Staggered reveal thresholds for smooth sequential animation
      // Design 1: visible by default (0-33% scroll)
      // Design 2: reveal at 33% scroll progress
      // Design 3: reveal at 66% scroll progress
      
      if (scrollProgress >= 0.66 && scrollRevealed < 3) {
        setScrollRevealed(3)
      } else if (scrollProgress >= 0.33 && scrollRevealed < 2) {
        setScrollRevealed(2)
      } else if (scrollProgress >= 0 && scrollRevealed < 1) {
        setScrollRevealed(1)
      }
    }

    // Initial check on mount
    handleScroll()
    
    // Throttle scroll events for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [scrollRevealed, activeButton])

  // Reset scroll reveal when button is clicked, restore to default when button is released
  useEffect(() => {
    if (activeButton !== null) {
      // Keep current scroll reveal when button is active
    } else {
      // When button is released, check scroll position to restore appropriate design
      if (designSectionRef.current) {
        const sectionTop = designSectionRef.current.offsetTop
        const sectionHeight = designSectionRef.current.offsetHeight
        const viewportHeight = window.innerHeight
        const scrollY = window.scrollY
        const sectionEnterPoint = sectionTop - viewportHeight
        const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionEnterPoint) / (sectionHeight + viewportHeight)))
        
        if (scrollProgress >= 0.66) {
          setScrollRevealed(3)
        } else if (scrollProgress >= 0.33) {
          setScrollRevealed(2)
        } else {
          setScrollRevealed(1)
        }
      }
    }
  }, [activeButton])

  // Determine which model should be visible
  const getVisibleModel = () => {
    if (activeButton !== null) {
      return activeButton // Button click takes priority
    }
    return scrollRevealed || 1 // Default to design 1 if no scroll reveal
  }

  const visibleModel = getVisibleModel()

  return (
    <>
      <nav className="bg-gray-100 w-full py-4 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left side - Navigation links */}
          <div className="flex items-center gap-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 flex items-center gap-1 font-medium">
              Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 flex items-center gap-1 font-medium">
              Resources
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Center - Logo */}
          <div className="flex items-center gap-2">
            <img 
              src="https://www.cryptique.io/assets/images/logo.png" 
              alt="Cryptique Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Right side - CTA Button */}
          <div>
            <button className="bg-[#4B0082] hover:bg-[#333333] text-white font-medium px-6 py-2 rounded-lg transition-colors">
              Request Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* Homepage Hero Section */}
      <section 
        className="w-full flex items-center justify-center pt-32 pb-8 px-8 bg-gray-100"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative max-w-4xl mx-auto pl-20 pr-20">
          {/* Left Side Brackets */}
          {/* Upper-left bracket */}
          <div className="absolute -left-16 top-1/4 w-16 h-16 border-t-2 border-l-2 border-gray-400"></div>
          {/* Lower-left bracket */}
          <div className="absolute -left-16 bottom-1/4 w-16 h-16 border-b-2 border-l-2 border-gray-400"></div>

          {/* Right Side Brackets (rotated 180 degrees) */}
          {/* Upper-right bracket */}
          <div className="absolute -right-16 top-1/4 w-16 h-16 border-t-2 border-r-2 border-gray-400"></div>
          {/* Lower-right bracket */}
          <div className="absolute -right-16 bottom-1/4 w-16 h-16 border-b-2 border-r-2 border-gray-400"></div>

          {/* Text Content */}
          <div 
            className="text-center transition-all duration-300 ease-out"
            style={{
              transform: isHovering 
                ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
                : 'translate(0, 0)'
            }}
          >
            <h1 className="text-gray-400 text-5xl md:text-6xl font-thin leading-tight tracking-tight transition-all duration-300">
              Turn your Audience
              <br />
              into Onchain Intelligence
            </h1>
          </div>
        </div>
      </section>

      {/* Supporting Section */}
      <section className="w-full pt-8 pb-16 px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h2 className="text-center text-[#333333] text-2xl font-medium mb-12 uppercase tracking-wide">
            SUPPORTING
          </h2>

          {/* Logos Carousel */}
          <div className="overflow-hidden">
            <div className="flex animate-scroll gap-8 md:gap-12">
              {/* First set of logos */}
              {[
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/linea-logo.png", alt: "Linea" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/mantle-logo.png", alt: "Mantle" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/moonbean-logo.png", alt: "Moonbeam" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/scroll-logo.svg", alt: "Scroll" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/zksync-logo.svg", alt: "zkSync" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/ethereum-logo.png", alt: "Ethereum" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/base-logo.png", alt: "Base" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/celo-logo.png", alt: "Celo" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/polygon-logo.png", alt: "Polygon" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/optimism-logo.png", alt: "Optimism" }
              ].map((logo, index) => (
                <div key={`first-${index}`} className="flex items-center justify-center flex-shrink-0">
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/linea-logo.png", alt: "Linea" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/mantle-logo.png", alt: "Mantle" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/moonbean-logo.png", alt: "Moonbeam" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/scroll-logo.svg", alt: "Scroll" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/zksync-logo.svg", alt: "zkSync" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/ethereum-logo.png", alt: "Ethereum" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/base-logo.png", alt: "Base" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/celo-logo.png", alt: "Celo" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/polygon-logo.png", alt: "Polygon" },
                { src: "https://www.cryptique.io/assets/images/blockchain-carousel/optimism-logo.png", alt: "Optimism" }
              ].map((logo, index) => (
                <div key={`second-${index}`} className="flex items-center justify-center flex-shrink-0">
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Dashboard Section */}
      <section className="w-full pt-16 pb-0 px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="text-center mb-12">
            <h2 className="text-[#333333] text-4xl md:text-5xl font-light mb-4">
              Live Dashboard
            </h2>
            <p className="text-gray-500 text-lg">
              Real-time onchain intelligence at your fingertips
            </p>
          </div>

          {/* Dashboard GIF */}
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-6xl rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://www.cryptique.io/assets/animations/dashboard.gif" 
                alt="Cryptique Live Dashboard" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content and Geometric Design Section */}
      <section className="w-full pt-12 pb-16 px-8 bg-gray-100 relative">
        <style>{`
          @keyframes dashLoop {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 48;
            }
          }
          
          @keyframes dashLoopReverse {
            0% {
              stroke-dashoffset: 48;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes dashRotate {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 14;
            }
          }
          
        `}</style>
        
        {/* Container for left and right halves */}
        <div className="w-full flex">
          {/* Left Side - Content Design */}
          <div className="w-1/2 flex items-center justify-center px-12 pt-8 pb-16">
            <div className="max-w-lg">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Fast, familiar, frictionless
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                No more high fees or long waits. Apps on Monad feel instant, cost pennies, and work with the wallets and tools you already know and love.
              </p>
              <button className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors uppercase tracking-wide">
                READ THE DOCUMENTATION
              </button>
              
              {/* Divider */}
              <div className="my-12 border-t border-gray-200"></div>
              
              {/* Numbered Items */}
              <div className="space-y-8">
                <button 
                  onClick={() => handleButtonClick(1)}
                  className={`w-full flex items-center gap-4 hover:opacity-70 transition-all cursor-pointer text-left ${
                    activeButton === 1 ? 'opacity-100 scale-105' : ''
                  }`}
                >
                  <span className="text-2xl font-bold text-gray-900">1</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">FAST, FAMILIAR, FRICTIONLESS</span>
                </button>
                <button 
                  onClick={() => handleButtonClick(2)}
                  className={`w-full flex items-center gap-4 hover:opacity-70 transition-all cursor-pointer text-left ${
                    activeButton === 2 ? 'opacity-100 scale-105' : ''
                  }`}
                >
                  <span className="text-2xl font-bold text-gray-900">2</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">DECENTRALIZED BY DESIGN</span>
                </button>
                <button 
                  onClick={() => handleButtonClick(3)}
                  className={`w-full flex items-center gap-4 hover:opacity-70 transition-all cursor-pointer text-left ${
                    activeButton === 3 ? 'opacity-100 scale-105' : ''
                  }`}
                >
                  <span className="text-2xl font-bold text-gray-900">3</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">COMMUNITY AT ITS CORE</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Side - Geometric Designs */}
          <div 
            ref={designSectionRef}
            className="w-1/2 relative" 
            style={{ marginRight: '-30px', minHeight: '600px' }}
          >
            {/* Stacked Container for all designs */}
            <div className="relative w-full" style={{ height: '600px' }}>
              {/* First Design - Geometric Squares */}
              <div 
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  activeButton === 1 ? 'ring-4 ring-gray-400 shadow-2xl' : ''
                }`}
                style={{ 
                  backgroundColor: '#fefefe',
                  opacity: visibleModel === 1 ? 1 : 0,
                  transform: visibleModel === 1 
                    ? (activeButton === 1 ? 'scale(1.05) translateZ(0)' : 'scale(1) translateZ(0)')
                    : 'scale(0.95) translateZ(0)',
                  zIndex: visibleModel === 1 ? (activeButton === 1 ? 30 : 20) : 1,
                  pointerEvents: visibleModel === 1 ? 'auto' : 'none',
                  willChange: 'transform, opacity',
                  transitionDelay: '0ms'
                }}
              >
              <div 
                ref={geometricContainerRef}
                className="w-full h-[600px] flex items-center justify-center overflow-hidden relative"
                onMouseMove={handleGeometricMouseMove}
                onMouseLeave={handleGeometricMouseLeave}
              >
              {/* Subtle dot grid background */}
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(42, 42, 42, 0.15) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0'
                }} 
              />

              {/* Corner brackets */}
              <div className="absolute top-8 left-8 w-12 h-12 border-black pointer-events-none" style={{ borderLeftWidth: '0.5px', borderTopWidth: '0.5px' }} />
              <div className="absolute top-8 right-8 w-12 h-12 border-black pointer-events-none" style={{ borderRightWidth: '0.5px', borderTopWidth: '0.5px' }} />
              <div className="absolute bottom-8 left-8 w-12 h-12 border-black pointer-events-none" style={{ borderLeftWidth: '0.5px', borderBottomWidth: '0.5px' }} />
              <div className="absolute bottom-8 right-8 w-12 h-12 border-black pointer-events-none" style={{ borderRightWidth: '0.5px', borderBottomWidth: '0.5px' }} />

              {/* Top label */}
              <div className="absolute top-12 right-12 text-xs font-mono text-gray-800 tracking-wider pointer-events-none">
                // 001
              </div>

              {/* Main container - ALL elements follow mouse cursor */}
              <div 
                className="relative flex items-center justify-center pointer-events-none"
                style={{
                  width: '420px',
                  height: '420px',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${geometricSmoothPosition.x}px), calc(-50% + ${geometricSmoothPosition.y}px))`,
                  willChange: 'transform'
                }}
              >
                {/* Background gradient layers */}
                <div 
                  className="absolute rounded-full"
                  style={{ 
                    width: '420px',
                    height: '420px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle at 30% 70%, rgba(255, 248, 220, 0.35) 0%, rgba(230, 230, 250, 0.3) 50%, transparent 75%)',
                    filter: 'blur(60px)',
                    zIndex: 0
                  }}
                />

                <div 
                  className="absolute rounded-full"
                  style={{ 
                    width: '380px',
                    height: '380px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle at 50% 30%, rgba(221, 160, 221, 0.3) 0%, rgba(176, 224, 230, 0.25) 50%, transparent 70%)',
                    filter: 'blur(50px)',
                    zIndex: 0
                  }}
                />

                <div 
                  className="absolute rounded-full"
                  style={{ 
                    width: '340px',
                    height: '340px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle at 70% 50%, rgba(173, 216, 230, 0.25) 0%, transparent 60%)',
                    filter: 'blur(40px)',
                    zIndex: 0
                  }}
                />

                {/* Large solid square - rotated 45deg */}
                <svg 
                  className="absolute"
                  style={{ 
                    width: '320px',
                    height: '320px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    zIndex: 2
                  }}
                  viewBox="0 0 320 320"
                >
                  <defs>
                    <linearGradient id="largeSolidFill" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(224, 231, 255, 0.15)" />
                      <stop offset="50%" stopColor="rgba(199, 210, 254, 0.2)" />
                      <stop offset="100%" stopColor="rgba(224, 231, 255, 0.15)" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="0.25"
                    y="0.25"
                    width="319.5"
                    height="319.5"
                    fill="url(#largeSolidFill)"
                    stroke="#000000"
                    strokeWidth="1.5"
                  />
                </svg>

                {/* Large dashed square - axis-aligned */}
                <svg 
                  className="absolute"
                  style={{ 
                    width: '288px',
                    height: '288px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3
                  }}
                  viewBox="0 0 288 288"
                >
                  <defs>
                    <linearGradient id="largeDashedFill" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(219, 234, 254, 0.15)" />
                      <stop offset="50%" stopColor="rgba(191, 219, 254, 0.2)" />
                      <stop offset="100%" stopColor="rgba(219, 234, 254, 0.15)" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="0.25"
                    y="0.25"
                    width="287.5"
                    height="287.5"
                    fill="url(#largeDashedFill)"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeDasharray="12 6"
                    style={{
                      strokeDashoffset: 0,
                      animation: 'dashLoop 3s linear infinite'
                    }}
                  />
                </svg>

                {/* Small dashed square - axis-aligned */}
                <svg 
                  className="absolute"
                  style={{ 
                    width: '224px',
                    height: '224px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 4
                  }}
                  viewBox="0 0 224 224"
                >
                  <rect
                    x="0.25"
                    y="0.25"
                    width="223.5"
                    height="223.5"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeDasharray="10 5"
                    style={{
                      strokeDashoffset: 0,
                      animation: 'dashLoopReverse 2.5s linear infinite'
                    }}
                  />
                </svg>

                {/* Small solid square - rotated 45deg */}
                <svg 
                  className="absolute"
                  style={{ 
                    width: '192px',
                    height: '192px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    zIndex: 5
                  }}
                  viewBox="0 0 192 192"
                >
                  <rect
                    x="0.25"
                    y="0.25"
                    width="191.5"
                    height="191.5"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              </div>
            </div>

              {/* Second Design - Orbital Circles */}
              <div 
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  activeButton === 2 ? 'ring-4 ring-gray-400 shadow-2xl' : ''
                }`}
                style={{ 
                  backgroundColor: '#fefefe',
                  opacity: visibleModel === 2 ? 1 : 0,
                  transform: visibleModel === 2 
                    ? (activeButton === 2 ? 'scale(1.05) translateZ(0)' : 'scale(1) translateZ(0)')
                    : 'scale(0.95) translateZ(0)',
                  zIndex: visibleModel === 2 ? (activeButton === 2 ? 30 : 20) : 1,
                  pointerEvents: visibleModel === 2 ? 'auto' : 'none',
                  willChange: 'transform, opacity',
                  transitionDelay: visibleModel === 2 && activeButton === null ? '200ms' : '0ms'
                }}
              >
              <div 
                ref={orbitalContainerRef}
                className="w-full h-[600px] flex items-center justify-center overflow-hidden relative"
                onMouseMove={handleOrbitalMouseMove}
                onMouseLeave={handleOrbitalMouseLeave}
              >
              {/* Subtle dot grid background */}
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(42, 42, 42, 0.15) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0'
                }} 
              />

              {/* Corner brackets */}
              <div className="absolute top-8 left-8 w-12 h-12 border-black pointer-events-none" style={{ borderLeftWidth: '0.5px', borderTopWidth: '0.5px' }} />
              <div className="absolute top-8 right-8 w-12 h-12 border-black pointer-events-none" style={{ borderRightWidth: '0.5px', borderTopWidth: '0.5px' }} />
              <div className="absolute bottom-8 left-8 w-12 h-12 border-black pointer-events-none" style={{ borderLeftWidth: '0.5px', borderBottomWidth: '0.5px' }} />
              <div className="absolute bottom-8 right-8 w-12 h-12 border-black pointer-events-none" style={{ borderRightWidth: '0.5px', borderBottomWidth: '0.5px' }} />

              {/* Bottom label */}
              <div className="absolute bottom-12 left-12 text-xs font-mono text-gray-800 tracking-wider pointer-events-none">
                // PERFORMANCE
              </div>

              {/* Main container for concentric circles */}
              <div 
                className="relative flex items-center justify-center pointer-events-none"
                style={{
                  width: '500px',
                  height: '500px',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${orbitalSmoothPosition.x}px), calc(-50% + ${orbitalSmoothPosition.y}px))`,
                  willChange: 'transform'
                }}
              >
                {/* Outer large solid circle with gradient background */}
                <svg 
                  className="absolute"
                  style={{ 
                    width: '400px',
                    height: '400px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2
                  }}
                  viewBox="0 0 400 400"
                >
                  <defs>
                    <radialGradient id="bigCircleGradient" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="rgba(255, 182, 193, 0.25)" />
                      <stop offset="40%" stopColor="rgba(255, 165, 0, 0.2)" />
                      <stop offset="70%" stopColor="rgba(255, 20, 147, 0.25)" />
                      <stop offset="100%" stopColor="rgba(221, 160, 221, 0.2)" />
                    </radialGradient>
                  </defs>
                  <circle
                    cx="200"
                    cy="200"
                    r="199"
                    fill="url(#bigCircleGradient)"
                    stroke="#000000"
                    strokeWidth="1"
                  />
                </svg>

                {/* Middle large solid circle */}
                <svg 
                  className="absolute"
                  style={{ 
                    width: '320px',
                    height: '320px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3
                  }}
                  viewBox="0 0 320 320"
                >
                  <circle
                    cx="160"
                    cy="160"
                    r="159"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1"
                  />
                </svg>

                {/* Small dashed circle */}
                <svg 
                  className="absolute"
                  style={{ 
                    width: '230px',
                    height: '230px',
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${orbitalSmoothPosition.x * 0.7}px), calc(-50% + ${orbitalSmoothPosition.y * 0.7}px))`,
                    zIndex: 4,
                    willChange: 'transform'
                  }}
                  viewBox="0 0 230 230"
                >
                  <circle
                    cx="115"
                    cy="115"
                    r="114"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1"
                    strokeDasharray="8 6"
                    style={{
                      animation: 'dashRotate 0.3s linear infinite'
                    }}
                  />
                </svg>

                {/* Complete horizontal ellipse */}
                <svg 
                  className="absolute"
                  style={{ 
                    width: '600px',
                    height: '500px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 5
                  }}
                  viewBox="0 0 600 500"
                >
                  <defs>
                    <mask id="ellipseMask">
                      <rect width="600" height="500" fill="white" />
                      <circle cx="300" cy="250" r="199.5" fill="black" />
                    </mask>
                    <clipPath id="ellipseFrontClip">
                      <rect x="0" y="250" width="600" height="250" />
                    </clipPath>
                  </defs>
                  <ellipse
                    cx="300"
                    cy="250"
                    rx="290"
                    ry="55"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1"
                    clipPath="url(#ellipseFrontClip)"
                  />
                  <ellipse
                    cx="300"
                    cy="250"
                    rx="290"
                    ry="55"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1"
                    mask="url(#ellipseMask)"
                    style={{
                      clipPath: 'inset(0 0 50% 0)'
                    }}
                  />
                </svg>
              </div>
              </div>
            </div>

              {/* Third Design - Translucent Sphere with Wireframe */}
              <div 
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  activeButton === 3 ? 'ring-4 ring-gray-400 shadow-2xl' : ''
                }`}
                style={{ 
                  backgroundColor: '#ffffff',
                  opacity: visibleModel === 3 ? 1 : 0,
                  transform: visibleModel === 3 
                    ? (activeButton === 3 ? 'scale(1.05) translateZ(0)' : 'scale(1) translateZ(0)')
                    : 'scale(0.95) translateZ(0)',
                  zIndex: visibleModel === 3 ? (activeButton === 3 ? 30 : 20) : 1,
                  pointerEvents: visibleModel === 3 ? 'auto' : 'none',
                  willChange: 'transform, opacity',
                  transitionDelay: visibleModel === 3 && activeButton === null ? '400ms' : '0ms'
                }}
              >
              <div 
                ref={sphereContainerRef}
                className="w-full h-[600px] flex items-center justify-center overflow-hidden relative"
                onMouseMove={handleSphereMouseMove}
                onMouseLeave={handleSphereMouseLeave}
              >
                {/* Subtle dot grid background */}
                <div 
                  className="absolute inset-0 pointer-events-none" 
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(42, 42, 42, 0.15) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0'
                  }} 
                />

                {/* Corner brackets */}
                <div className="absolute top-8 left-8 w-12 h-12 border-black pointer-events-none" style={{ borderLeftWidth: '0.5px', borderTopWidth: '0.5px' }} />
                <div className="absolute top-8 right-8 w-12 h-12 border-black pointer-events-none" style={{ borderRightWidth: '0.5px', borderTopWidth: '0.5px' }} />
                <div className="absolute bottom-8 left-8 w-12 h-12 border-black pointer-events-none" style={{ borderLeftWidth: '0.5px', borderBottomWidth: '0.5px' }} />
                <div className="absolute bottom-8 right-8 w-12 h-12 border-black pointer-events-none" style={{ borderRightWidth: '0.5px', borderBottomWidth: '0.5px' }} />

                {/* Text labels */}
                <div className="absolute top-12 right-12 text-xs font-mono text-gray-800 tracking-wider pointer-events-none">
                  // 003
                </div>
                <div className="absolute bottom-12 left-12 text-xs font-mono text-gray-800 tracking-wider pointer-events-none">
                  // COMMUNITY
                </div>

                {/* Main sphere design */}
                <svg 
                  width="400"
                  height="400"
                  viewBox="0 0 400 400"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${sphereSmoothPosition.x}px), calc(-50% + ${sphereSmoothPosition.y}px))`,
                    willChange: 'transform'
                  }}
                >
                  <defs>
                    {/* Radial gradient for translucent sphere - pink/magenta center to blue/lavender edges */}
                    <radialGradient id="sphereGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFB6E1" stopOpacity="0.8" />
                      <stop offset="30%" stopColor="#FF9ECF" stopOpacity="0.7" />
                      <stop offset="60%" stopColor="#E6B8FF" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#B8D4FF" stopOpacity="0.5" />
                    </radialGradient>
                    
                    {/* Mask for dashed lines to appear on sphere surface */}
                    <mask id="sphereMask">
                      <circle cx="200" cy="200" r="180" fill="white" />
                    </mask>
                  </defs>

                  {/* Main translucent sphere */}
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="url(#sphereGradient)"
                    stroke="#000000"
                    strokeWidth="1.5"
                    opacity="0.9"
                  />

                  {/* Wireframe dashed lines - horizontal equator */}
                  <ellipse
                    cx="200"
                    cy="200"
                    rx="180"
                    ry="60"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1"
                    strokeDasharray="8 6"
                    strokeDashoffset="0"
                    mask="url(#sphereMask)"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;14"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                  </ellipse>

                  {/* Wireframe dashed lines - vertical prime meridian */}
                  <ellipse
                    cx="200"
                    cy="200"
                    rx="60"
                    ry="180"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1"
                    strokeDasharray="8 6"
                    strokeDashoffset="0"
                    mask="url(#sphereMask)"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;-14"
                      dur="0.75s"
                      repeatCount="indefinite"
                    />
                  </ellipse>

                  {/* Wireframe dashed lines - diagonal X pattern (first diagonal) */}
                  <ellipse
                    cx="200"
                    cy="200"
                    rx="180"
                    ry="60"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1"
                    strokeDasharray="8 6"
                    strokeDashoffset="0"
                    transform="rotate(45 200 200)"
                    mask="url(#sphereMask)"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;14"
                      dur="0.9s"
                      repeatCount="indefinite"
                    />
                  </ellipse>

                  {/* Wireframe dashed lines - diagonal X pattern (second diagonal) */}
                  <ellipse
                    cx="200"
                    cy="200"
                    rx="180"
                    ry="60"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1"
                    strokeDasharray="8 6"
                    strokeDashoffset="0"
                    transform="rotate(-45 200 200)"
                    mask="url(#sphereMask)"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;-14"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </ellipse>
                </svg>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Design Section - Build Beyond Limits */}
      <section className="w-full py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="w-full flex">
            {/* Left Side - Feature List */}
            <div className="w-1/4 flex flex-col justify-center pr-12">
              <div className="h-full flex flex-col justify-center space-y-6 border-l-2 border-gray-300 pl-8">
                <div className="text-sm font-light text-gray-400 uppercase tracking-wide">
                  / UNPARALLELED PERFORMANCE
                </div>
                <div className="text-sm font-light text-gray-400 uppercase tracking-wide">
                  / PLUG AND PLAY
                </div>
                <div className="text-sm font-light text-gray-400 uppercase tracking-wide">
                  / TRUE DECENTRALIZATION
                </div>
              </div>
            </div>

            {/* Right Side - Main Slogan */}
            <div className="w-3/4 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight mb-4">
                  Build beyond limits.
                </h2>
                <h2 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                  Scale <span className="italic">without</span> compromise.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venn Diagram Section - Security, Decentralization, Scalability */}
      <section className="w-full py-32 px-8 bg-gray-50 relative overflow-hidden">
        {/* Subtle dotted grid background */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(42, 42, 42, 0.15) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0'
          }} 
        />

        {/* Menu indicator on right edge */}
        <div className="absolute top-12 right-12 flex flex-col gap-1.5 pointer-events-none">
          <div className="w-6 h-0.5 bg-gray-400"></div>
          <div className="w-8 h-0.5 bg-gray-600"></div>
          <div className="w-6 h-0.5 bg-gray-400"></div>
          <div className="w-6 h-0.5 bg-gray-400"></div>
          <div className="w-6 h-0.5 bg-gray-400"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-center" style={{ minHeight: '600px' }}>
            <svg 
              width="800" 
              height="650" 
              viewBox="0 -50 800 650"
              style={{ maxWidth: '100%', height: 'auto' }}
            >
              <defs>
                {/* Security circle gradient - light blue to cyan */}
                <radialGradient id="securityGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#00CED1" stopOpacity="0.4" />
                </radialGradient>

                {/* Decentralization circle gradient - pink to magenta */}
                <radialGradient id="decentralizationGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#FFB6E1" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FF69B4" stopOpacity="0.4" />
                </radialGradient>

                {/* Scalability circle gradient - purple to indigo */}
                <radialGradient id="scalabilityGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#9370DB" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#4B0082" stopOpacity="0.4" />
                </radialGradient>
              </defs>

              {/* Security Circle - Top */}
              <g>
                <circle
                  cx="400"
                  cy="200"
                  r="180"
                  fill="url(#securityGradient)"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeDashoffset="0"
                  opacity="0.9"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;8"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Label line - from top of circle to label */}
                <line
                  x1="400"
                  y1="20"
                  x2="400"
                  y2="-20"
                  stroke="#000000"
                  strokeWidth="1"
                />
                {/* Label */}
                <text
                  x="400"
                  y="-30"
                  textAnchor="middle"
                  fontSize="14"
                  fontFamily="sans-serif"
                  fontWeight="600"
                  fill="#000000"
                  letterSpacing="2px"
                >
                  SECURITY
                </text>
              </g>

              {/* Decentralization Circle - Bottom Left */}
              <g>
                <circle
                  cx="250"
                  cy="450"
                  r="180"
                  fill="url(#decentralizationGradient)"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeDashoffset="0"
                  opacity="0.9"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;-8"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Label line - from bottom of circle to label */}
                <line
                  x1="70"
                  y1="630"
                  x2="70"
                  y2="600"
                  stroke="#000000"
                  strokeWidth="1"
                />
                {/* Label */}
                <text
                  x="70"
                  y="590"
                  textAnchor="middle"
                  fontSize="14"
                  fontFamily="sans-serif"
                  fontWeight="600"
                  fill="#000000"
                  letterSpacing="2px"
                >
                  DECENTRALIZATION
                </text>
              </g>

              {/* Scalability Circle - Bottom Right */}
              <g>
                <circle
                  cx="550"
                  cy="450"
                  r="180"
                  fill="url(#scalabilityGradient)"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeDashoffset="0"
                  opacity="0.9"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;8"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Label line - from bottom of circle to label */}
                <line
                  x1="730"
                  y1="630"
                  x2="730"
                  y2="600"
                  stroke="#000000"
                  strokeWidth="1"
                />
                {/* Label */}
                <text
                  x="730"
                  y="590"
                  textAnchor="middle"
                  fontSize="14"
                  fontFamily="sans-serif"
                  fontWeight="600"
                  fill="#000000"
                  letterSpacing="2px"
                >
                  SCALABILITY
                </text>
              </g>
            </svg>
          </div>
        </div>
      </section>
    </>
  )
}

export default App