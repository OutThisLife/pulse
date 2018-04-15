// @flow
import { pure, withHandlers } from 'recompose'

export default withHandlers(() => ({
  onRef: () => (ref: ?HTMLElement) => {
    if (!ref) {
      return
    }

    const { innerWidth, innerHeight } = window

    const camera = new THREE.PerspectiveCamera(25, innerWidth / innerHeight, 1, 4000)
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    camera.position.z = 1300
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(innerWidth, innerHeight)
    renderer.gammaInput = true
    renderer.gammaOutput = true
    ref.appendChild(renderer.domElement)

    window.onresize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    const MAX_POINTS = 400
    const MAX_LINES = MAX_POINTS * MAX_POINTS

    // ---

    const particlePositions = new Float32Array(MAX_POINTS * 3)
    const particleData = []

    for (let i = 0; i < MAX_POINTS; i++) {
      particlePositions[i * 3 + 0] = Math.random() * 800 - 800 / 2
      particlePositions[i * 3 + 1] = Math.random() * 800 - 800 / 2
      particlePositions[i * 3 + 2] = Math.random() * 800 - 800 / 2

      particleData.push({
        velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2)
      })
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setDrawRange(0, MAX_POINTS)

    const points = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: false
      })
    )

    // ---

    const linePositions = new Float32Array(MAX_LINES * 3)
    const lineColors = new Float32Array(MAX_LINES * 3)

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.addAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    lineGeometry.addAttribute('color', new THREE.BufferAttribute(lineColors, 3))

    lineGeometry.setDrawRange(0, 0)

    const lines = new THREE.LineSegments(
      lineGeometry,
      new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        transparent: true
      })
    )

    // --

    scene.add(points)
    scene.add(lines)

    // ---

    const xyz = cb => ['x', 'y', 'z'].forEach(cb)

    const render = () => {
      let numConnected = 0
      let colorPos = 0
      let linePos = 0

      for (let i = 0; i < MAX_POINTS; i++) {
        const { velocity } = particleData[i]

        xyz((k, n) => {
          particlePositions[i * 3 + n] += velocity[k] * 0.25

          if (particlePositions[i * 3 + n] < -400 || particlePositions[i * 3 + n] > 400) {
            particleData[i].velocity[k] = -velocity[k]
          }
        })

        for (let j = i + 1; j < MAX_POINTS; j++) {
          const dx = particlePositions[i * 3 + 0] - particlePositions[j * 3 + 0]
          const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1]
          const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < 70) {
            const alpha = 1.0 - dist / 70
            xyz((k, n) => (linePositions[linePos++] = particlePositions[i * 3 + n]))
            xyz((k, n) => (linePositions[linePos++] = particlePositions[j * 3 + n]))
            xyz(() => (lineColors[colorPos++] = alpha))
            xyz(() => (lineColors[colorPos++] = alpha))
            numConnected++
          }
        }
      }

      lines.geometry.attributes.position.needsUpdate = true
      lines.geometry.attributes.color.needsUpdate = true
      points.geometry.attributes.position.needsUpdate = true
      lineGeometry.setDrawRange(0, numConnected / 2)

      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }

    const animate = () => {
      requestAnimationFrame(animate)
      render()
    }

    requestAnimationFrame(animate)
  }
}))(
  pure(({ t, onRef }: { onRef: Function }) => (
    <div
      key={t}
      ref={onRef}
      style={{
        opacity: 0.2,
        zIndex: -1,
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        boxShadow: 'inset 0 0 200px 50px rgba(0,0,0,.7)'
      }}
    />
  ))
)
