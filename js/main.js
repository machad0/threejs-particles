if (!Detector.webgl) Detector.addGetWebGLMessage();

let container, camera,
    controls,
    scene,
    renderer,
    particles,
    geometry,
    objParams,
    sprite,
    size,
    color,
    materialSpec = [];

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 1000;
    scene = new THREE.Scene();
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.5;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.addEventListener('change', render, false);
    scene.fog = new THREE.FogExp2(0x000000, 0.0008);
    geometry = new THREE.Geometry();
    const textureLoader = new THREE.TextureLoader();
    obj1 = textureLoader.load("img/dog.png");
    obj2 = textureLoader.load("img/bulldog.png");
    obj3 = textureLoader.load("img/kitten.png");
    obj4 = textureLoader.load("img/kitten2.png");
    obj5 = textureLoader.load("img/bb.png");
    for (var i = 0; i < 10000; i++) {
        const vectors = new THREE.Vector3();
        vectors.x = Math.random() * 2000 - 1000;
        vectors.y = Math.random() * 2000 - 1000;
        vectors.z = Math.random() * 2000 - 1000;
        geometry.vertices.push(vectors);
    }
    objParams = [
        [
            [0.90, 0.05, 0.5], obj1, 10
        ],
        [
            [1.0, 0.2, 0.5], obj2, 18
        ],
        [
            [0.95, 0.1, 0.5], obj3, 15
        ],
        [
            [0.80, 0, 0.5], obj4, 10
        ],
        [
            [0.85, 0, 0.5], obj5, 12
        ]
    ];
    for (var i = 0; i < objParams.length; i++) {
        color = objParams[i][0];
        sprite = objParams[i][1];
        size = objParams[i][2];
        materialSpec[i] = new THREE.PointsMaterial({
            size,
            map: sprite,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });
        materialSpec[i].color.setHSL(color[0], color[1], color[2]);
        particles = new THREE.Points(geometry, materialSpec[i]);
        particles.rotation.x = Math.random() * 7;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 5;
        scene.add(particles);
    };
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
};

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    controls.handleResize();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
};

function render() {
    renderer.render(scene, camera);
};
