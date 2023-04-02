import * as THREE from "https://web.cs.manchester.ac.uk/three/three.js-master/build/three.module.js";
        import {OrbitControls} from "https://web.cs.manchester.ac.uk/three/three.js-master/examples/jsm/controls/OrbitControls.js";
        var camera, scene, renderer;
        var sunGeometry, sunMaterial, sunMesh, sunTexture;
        var plight, alight;
        var moonGeometry, moonMaterial, moonMesh, moonTexture;
        var earthGeometry, earthMaterial, earthMesh, earthTexture;
        var earthCurve, earthCurveMaterial, earthCurveGeometry, earthCurveEllipse;
        var mercuryGeometry, mercuryMaterial, mercuryMesh, mercuryTexture;
        var mercuryCurve, mercuryCurveMaterial, mercuryCurveGeometry, mercuryCurveEllipse;
        var venusGeometry, venusMaterial, venusMesh, venusTexture;
        var venusCurve, venusCurveMaterial, venusCurveGeometry, venusCurveEllipse;
        var marsGeometry, marsMaterial, marsMesh, marsTexture;
        var marsCurve, marsCurveMaterial, marsCurveGeometry, marsCurveEllipse;
        var jupiterGeometry, jupiterMaterial, jupiterMesh, jupiterTexture;
        var jupiterCurve, jupiterCurveMaterial, jupiterCurveGeometry, jupiterCurveEllipse;
        var neptuneGeometry, neptuneMaterial, neptuneMesh, neptuneTexture;
        var neptuneCurve, neptuneCurveMaterial, neptuneCurveGeometry, neptuneCurveEllipse;
        var saturnGeometry, saturnMaterial, saturnMesh, saturnTexture;
        var saturnCurve, saturnCurveMaterial, saturnCurveGeometry, saturnCurveEllipse;
        var uranusGeometry, uranusMaterial, uranusMesh, uranusTexture;
        var uranusCurve, uranusCurveMaterial, uranusCurveGeometry, uranusCurveEllipse;
        var systemT, venusT, mercuryT, marsT, jupiterT, neptuneT, saturnT, uranusT;
        var earthSystem, systemPoint, mercuryPoint, venusPoint, marsPoint, jupiterPoint, neptunePoint, saturnPoint, uranusPoint, controls;
        const w = 15.04108;
        const moonSpeed = 18.85;
        const moonOrbitRadius = 40;

        function init() {
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
                camera.position.x = -1000;
                camera.position.y = 300;
                camera.position.z = 600;
                renderer = new THREE.WebGLRenderer();
                renderer.setClearColor(0x000000, 1.0);
                renderer.setSize(window.innerWidth, window.innerHeight);
                document.body.appendChild(renderer.domElement);
                controls = new OrbitControls(camera, renderer.domElement);
                controls.autoRotate = true;
                Sun();
                innerPlanets();
                outerplanets();
            }
        
        function Sun() {
            sunGeometry = new THREE.SphereGeometry(109, 400, 200);
            const loader = new THREE.TextureLoader();
            sunTexture =  loader.load("assests/sunTexture.jpg")
            sunMaterial = new THREE.MeshStandardMaterial({emissive: 0xffd700, 
                                                        emissiveMap: sunTexture, 
                                                        emissiveIntensity: 1,
                                                        wireframe: false
                                                        });
            sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
            scene.add(sunMesh);
            PointLight();
            AmbientLight();
        }

        function PointLight() {
            plight = new THREE.PointLight(0xffffff, 1, 0, 2);
            plight.position.set(0, 0, 0);
            scene.add(plight);
        }

        function AmbientLight() {
            alight = new THREE.AmbientLight(0x404040);
            scene.add(alight);
        }

        function innerPlanets() {
            Mercury();
            Venus();
            Moon();
            Earth();
            Mars();
            System();
            SystemOrbit();
        }

        function outerplanets() {
            Jupiter();
            Saturn();
            Neptune();
            Uranus();
        }

        function Mercury() {
            mercuryGeometry = new THREE.SphereGeometry(15, 30, 30);
            const loader = new THREE.TextureLoader();
            mercuryTexture = loader.load("assests/mercuryTexture.jpg");
            mercuryMaterial = new THREE.MeshPhongMaterial({map:mercuryTexture
                                                        });
            mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
            mercuryMesh.position.set(400, 0, 0);
            scene.add(mercuryMesh);

            mercuryCurve = new THREE.EllipseCurve(mercuryMesh.position.x - 300, mercuryMesh.position.z, 300, 150, 0, 2 * Math.PI);
            var points = mercuryCurve.getPoints(100);
            mercuryCurveGeometry = new THREE.BufferGeometry().setFromPoints(points);
            mercuryCurveMaterial = new THREE.LineBasicMaterial({color: 0xffffff});

            // Create the final ellipse mercuryCurve to add to the scene
            mercuryCurveEllipse = new THREE.Line(mercuryCurveGeometry, mercuryCurveMaterial);

            // Rotate the mercurycurveEllipse to be on XZ insted of XY and add to the scene
            mercuryCurveEllipse.rotation.x = 90 * Math.PI / 180;
            scene.add(mercuryCurveEllipse);
        }

        function Venus() {
            venusGeometry = new THREE.SphereGeometry(24, 48, 48);
            const loader = new THREE.TextureLoader();
            venusTexture = loader.load("assests/venusTexture.jpg");
            venusMaterial = new THREE.MeshPhongMaterial({map: venusTexture
                                                        });
            venusMesh = new THREE.Mesh(venusGeometry, venusMaterial);
            venusMesh.position.set(550, 0, 0);
            scene.add(venusMesh);

            venusCurve = new THREE.EllipseCurve(venusMesh.position.x - 400, venusMesh.position.z, 400, 210, 0, 2 * Math.PI);
            var points = venusCurve.getPoints(100);
            venusCurveGeometry = new THREE.BufferGeometry().setFromPoints(points);
            venusCurveMaterial = new THREE.LineBasicMaterial({color: 0xffffff});

            venusCurveEllipse = new THREE.Line(venusCurveGeometry, venusCurveMaterial);

            venusCurveEllipse.rotation.x = 90 * Math.PI / 180;
            scene.add(venusCurveEllipse);
        }

        function Mars() {
            marsGeometry = new THREE.SphereGeometry(23, 46, 46);
            const loader = new THREE.TextureLoader();
            marsTexture = loader.load("assests/marsTexture.jpg");
            marsMaterial = new THREE.MeshPhongMaterial({map:marsTexture
                                                        });
            marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
            marsMesh.position.set(850, 0, 0);
            scene.add(marsMesh);

            marsCurve = new THREE.EllipseCurve(marsMesh.position.x - 630, marsMesh.position.z, 630, 340, 0, 2 * Math.PI);
            var points = marsCurve.getPoints(100);
            marsCurveGeometry = new THREE.BufferGeometry().setFromPoints(points);
            marsCurveMaterial = new THREE.LineBasicMaterial({color: 0xffffff});

            marsCurveEllipse = new THREE.Line(marsCurveGeometry, marsCurveMaterial);

            marsCurveEllipse.rotation.x = 90 * Math.PI / 180;
            scene.add(marsCurveEllipse);
        }

        function Jupiter(){
            jupiterGeometry = new THREE.SphereGeometry(50, 100, 100);
            const loader = new THREE.TextureLoader();
            jupiterTexture = loader.load("assests/jupiterTexture.png");
            jupiterMaterial = new THREE.MeshPhongMaterial({map:jupiterTexture
                                                        });
            jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
            jupiterMesh.position.set(1000, 0, 0);
            scene.add(jupiterMesh);

            jupiterCurve = new THREE.EllipseCurve(jupiterMesh.position.x - 600, jupiterMesh.position.z, 900, 490, 0, 2 * Math.PI);
            var points = jupiterCurve.getPoints(100);
            jupiterCurveGeometry = new THREE.BufferGeometry().setFromPoints(points);
            jupiterCurveMaterial = new THREE.LineBasicMaterial({color: 0xffffff});

            jupiterCurveEllipse = new THREE.Line(jupiterCurveGeometry, jupiterCurveMaterial);

            jupiterCurveEllipse.rotation.x = 90 * Math.PI / 180;
            scene.add(jupiterCurveEllipse);
        }

        function Saturn() {
            saturnGeometry = new THREE.SphereGeometry(40, 80, 80);
            const loader = new THREE.TextureLoader();
            saturnTexture = loader.load("assests/saturnTexture.jpg");
            saturnMaterial = new THREE.MeshPhongMaterial({map:saturnTexture
                                                        });
            saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);
            saturnMesh.position.set(1200, 0, 0);
            scene.add(saturnMesh);

            saturnCurve = new THREE.EllipseCurve(saturnMesh.position.x - 710, saturnMesh.position.z, 1100, 600, 0, 2 * Math.PI);
            var points = saturnCurve.getPoints(100);
            saturnCurveGeometry = new THREE.BufferGeometry().setFromPoints(points);
            saturnCurveMaterial = new THREE.LineBasicMaterial({color: 0xffffff});

            saturnCurveEllipse = new THREE.Line(saturnCurveGeometry, saturnCurveMaterial);

            saturnCurveEllipse.rotation.x = 90 * Math.PI / 180;
            scene.add(saturnCurveEllipse);
        }

        function Uranus() {
            uranusGeometry = new THREE.SphereGeometry(35, 70, 70);
            const loader = new THREE.TextureLoader();
            uranusTexture = loader.load("assests/uranusTexture.jpg");
            uranusMaterial = new THREE.MeshPhongMaterial({map:uranusTexture
                                                        });
            uranusMesh = new THREE.Mesh(uranusGeometry, uranusMaterial);
            uranusMesh.position.set(1200, 0, 0);
            scene.add(uranusMesh);

            uranusCurve = new THREE.EllipseCurve(uranusMesh.position.x - 610, uranusMesh.position.z, 1300, 700, 0, 2 * Math.PI);
            var points = uranusCurve.getPoints(100);
            uranusCurveGeometry = new THREE.BufferGeometry().setFromPoints(points);
            uranusCurveMaterial = new THREE.LineBasicMaterial({color: 0xffffff});

            uranusCurveEllipse = new THREE.Line(uranusCurveGeometry, uranusCurveMaterial);

            uranusCurveEllipse.rotation.x = 90 * Math.PI / 180;
            scene.add(uranusCurveEllipse);
        }

        function Neptune() {
            neptuneGeometry = new THREE.SphereGeometry(30, 60, 60);
            const loader = new THREE.TextureLoader();
            neptuneTexture = loader.load("assests/neptuneTexture.jpg");
            neptuneMaterial = new THREE.MeshPhongMaterial({map:neptuneTexture
                                                        });
            neptuneMesh = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
            neptuneMesh.position.set(1200, 0, 0);
            scene.add(neptuneMesh);

            neptuneCurve = new THREE.EllipseCurve(neptuneMesh.position.x - 500, neptuneMesh.position.z, 1500, 800, 0, 2 * Math.PI);
            var points = neptuneCurve.getPoints(100);
            neptuneCurveGeometry = new THREE.BufferGeometry().setFromPoints(points);
            neptuneCurveMaterial = new THREE.LineBasicMaterial({color: 0xffffff});

            // Create the final ellipse mercuryCurve to add to the scene
            neptuneCurveEllipse = new THREE.Line(neptuneCurveGeometry, neptuneCurveMaterial);

            // Rotate the mercurycurveEllipse to be on XZ insted of XY and add to the scene
            neptuneCurveEllipse.rotation.x = 90 * Math.PI / 180;
            scene.add(neptuneCurveEllipse);
        }

        function Moon() {
            moonGeometry = new THREE.SphereGeometry(5, 40, 20);
            const loader = new THREE.TextureLoader();
            moonTexture = loader.load("assests/moonTexture.jpg")
            moonMaterial = new THREE.MeshPhongMaterial({map: moonTexture
                                                        });
            moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        }

        function Earth() {
            earthGeometry = new THREE.SphereGeometry(25, 50, 50);
            const loader = new THREE.TextureLoader();
            earthTexture = loader.load("assests/earthTexture.jpg")
            earthMaterial = new THREE.MeshPhongMaterial({map: earthTexture
                                                        });
            earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        }

        function System() {
            earthSystem = new THREE.Group();
            earthSystem.add(earthMesh);
            earthSystem.add(moonMesh);
            moonMesh.position.set(50, 0, 0);
            scene.add(earthSystem);
        }

        function SystemOrbit() {
            earthCurve = new THREE.EllipseCurve(earthSystem.position.x + 170, earthSystem.position.z, 500, 290, 0, 2 * Math.PI);
            var points = earthCurve.getPoints(100);
            earthCurveGeometry = new THREE.BufferGeometry().setFromPoints(points);
            earthCurveMaterial = new THREE.LineBasicMaterial({color: 0xffffff});

            // Create the final ellipse earthCurve to add to the scene
            earthCurveEllipse = new THREE.Line(earthCurveGeometry, earthCurveMaterial);

            // Rotate the curveEllipse to be on XZ insted of XY and add to the scene
            earthCurveEllipse.rotation.x = 90 * Math.PI / 180;
            scene.add(earthCurveEllipse);
        }

        function animate() {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
            earthMesh.rotation.y += 0.01;
            mercuryMesh.rotation.y += 0.01;
            venusMesh.rotation.y += 0.01;
            marsMesh.rotation.y += 0.01;
            jupiterMesh.rotation.y += 0.008;
            saturnMesh.rotation.y += 0.009;
            uranusMesh.rotation.y += 0.01;
            neptuneMesh.rotation.y += 0.01;

            systemT = 0.0001 * performance.now();
            systemT = systemT % 1;
            mercuryT = 0.0002 * performance.now();
            mercuryT = mercuryT % 1;
            venusT = 0.00021 * performance.now();
            venusT = venusT % 1;
            marsT = 0.00011 * performance.now();
            marsT = marsT % 1;
            jupiterT = 0.00006 * performance.now();
            jupiterT = jupiterT % 1;
            saturnT = 0.00009 * performance.now();
            saturnT = saturnT % 1;
            uranusT = 0.00004 * performance.now();
            uranusT = uranusT % 1;
            neptuneT = 0.00002 * performance.now();
            neptuneT = neptuneT % 1;

            mercuryPoint = mercuryCurve.getPoint(mercuryT);
            mercuryMesh.position.x = mercuryPoint.x;
            mercuryMesh.position.z = mercuryPoint.y;

            systemPoint = earthCurve.getPoint(systemT);
            earthSystem.position.x = systemPoint.x;
            earthSystem.position.z = systemPoint.y;

            venusPoint = venusCurve.getPoint(venusT);
            venusMesh.position.x = venusPoint.x;
            venusMesh.position.z = venusPoint.y;

            marsPoint = marsCurve.getPoint(marsT);
            marsMesh.position.x = marsPoint.x;
            marsMesh.position.z = marsPoint.y;

            jupiterPoint = jupiterCurve.getPoint(jupiterT);
            jupiterMesh.position.x = jupiterPoint.x;
            jupiterMesh.position.z = jupiterPoint.y;

            saturnPoint = saturnCurve.getPoint(saturnT);
            saturnMesh.position.x = saturnPoint.x;
            saturnMesh.position.z = saturnPoint.y;

            uranusPoint = uranusCurve.getPoint(uranusT);
            uranusMesh.position.x = uranusPoint.x;
            uranusMesh.position.z = uranusPoint.y;

            neptunePoint = neptuneCurve.getPoint(neptuneT);
            neptuneMesh.position.x = neptunePoint.x;
            neptuneMesh.position.z = neptunePoint.y;

            moonMesh.position.x = moonOrbitRadius * Math.cos(systemT * moonSpeed);
            moonMesh.position.z = moonOrbitRadius * Math.sin(systemT * moonSpeed);
        }

        init();
        animate();