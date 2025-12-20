import { useState, useEffect, useRef } from 'react'

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  
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

      {/* Geometric Design Section - Right Half */}
      <section className="w-full pt-0 pb-16 px-8 bg-gray-100 relative">
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
        
        {/* Container for right half positioning */}
        <div className="w-full flex justify-end">
          <div 
            className="w-1/2 relative"
            style={{ backgroundColor: '#fefefe' }}
          >
            {/* First Design - Geometric Squares */}
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

              {/* Bottom label */}
              <div className="absolute bottom-12 left-12 text-xs font-mono text-gray-800 tracking-wider pointer-events-none">
                // PERFORMANCE
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

            {/* Second Design - Orbital Circles */}
            <div 
              ref={orbitalContainerRef}
              className="w-full h-[600px] flex items-center justify-center overflow-hidden relative"
              style={{
                backgroundColor: '#fefefe'
              }}
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
        </div>
      </section>
    </>
  )
}

export default App