import { useEffect, useId } from "react";
import { Box, SxProps, alpha, darken } from "@mui/material";
import "./SimplexNoise.min.js";
import { useLandingColor } from "./index.js";
import { useColorMode } from "@/store/appearanceSlice.js";
import { lighten } from "@mui/material";

export function AnimatedGeometricWaves({ sx, singleRender }: { sx?: SxProps; singleRender: boolean }) {
    const id = "animated-waves-" + useId();
    const isDarkMode = useColorMode().dark;
    let accentColor = useLandingColor(isDarkMode ? "accentB" : "accentA");
    accentColor = isDarkMode ? darken(accentColor, 0.3) : alpha(lighten(accentColor, 0.3), 0.9);
    let notelessColor = useLandingColor(isDarkMode ? "noteless" : "contrast");
    notelessColor = isDarkMode ? alpha(notelessColor, 0.4) : lighten(notelessColor, 0.8);
    useEffect(() => {
        const canvas = document.getElementById(id);
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        let { PI, cos } = Math;
        let colors = {
            accent: "#19232a",
            base: "#5c8abd",
            dark: "#504e4e",
        };

        class Wave {
            constructor(canvas) {
                this.canvas = canvas;
                this.ctx = canvas.getContext("2d");
                this.buildFrame = this.buildFrame.bind(this);
                this.pointDx = 25;
                this.speed = 0.0001;
                this.noise = new SimplexNoise();
                this.iteration = 0;
                this.amplitude = 0;
                this.strands = [];
                this.lastRender = 0;
                this.disposed = false;
            }

            addStrand(strand = new Strand()) {
                this.strands.push(strand);
            }

            drawWave(t, options = {}) {
                let { inverted, offset, amplitudeScalar, color } = options;
                let sign = 1; //inverted ? -1 : 1;
                let points = canvas.width / this.pointDx;
                this.ctx.beginPath();
                this.ctx.moveTo(0, canvas.height / 2);
                for (let i = 0; i < points; i++) {
                    let x = i * this.pointDx;
                    let noise = this.noise.noise2D((i + this.iteration) / 100, (this.iteration + offset) / 100);
                    let y = canvas.height / 2 - sign * this.envelopeScalar(x, amplitudeScalar) * noise;
                    this.ctx.lineTo(x, y);
                }
                let gradient = this.ctx.createLinearGradient(canvas.width / 4, 0, canvas.width * 0.7, 0);
                gradient.addColorStop(isDarkMode ? 0.2 : 0.5, notelessColor);
                gradient.addColorStop(1, accentColor);
                // gradient.addColorStop(0.2, "#292c3f40");
                // gradient.addColorStop(1, "#2a8a69");
                this.ctx.strokeStyle = gradient;
                this.ctx.stroke();
            }

            envelopeScalar(x, amplitudeScalar = 1) {
                return 100 * cos((3 * PI) / 2 + PI * (x / this.canvas.width)) * amplitudeScalar;
            }

            buildFrame(t) {
                if (this.disposed) return;
                const time = t;
                if (this.amplitude > 0 && !singleRender) requestAnimationFrame(this.buildFrame);
                //if (time - this.lastRender < 200) return;
                this.lastRender = time;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                for (let i = 0; i < this.strands.length; i++) {
                    this.drawWave(t, this.strands[i]);
                }
                this.iteration += 0.05;
            }

            animate() {
                this.amplitude += 1;
                if (this.amplitude === 1) this.buildFrame();
                this.isActive = true;
                this.animateTransition();
            }

            animateTransition() {
                if (this.disposed) return;
                let anim = function () {
                    if (this.amplitude < 100 && this.amplitude > 0) requestAnimationFrame(anim);
                    this.amplitude += this.isActive ? 1 : -1;
                };
                anim = anim.bind(this);
                cancelAnimationFrame(this.transitionRAF);
                this.transitionRAF = requestAnimationFrame(anim);
            }
            dispose() {
                this.disposed = true;
            }
            close() {
                this.isActive = false;
                this.animateTransition();
            }
        }

        class Strand {
            constructor(options) {
                this.amplitudeScalar = 6;
                this.inverted = false;
                this.offset = 0;
                this.color = "blue";
                Object.assign(this, options);
            }
        }

        let wave = new Wave(canvas);
        let options = Array.from(new Array(singleRender ? 60 : 5)).map((v, i) => ({
            offset: singleRender ? i * 1.5 : i * 8,
            color: colors.accent,
        }));
        options.forEach((option) => wave.addStrand(new Strand(option)));
        wave.animate();
        return () => {
            wave.dispose();
        };
    }, []);
    return (
        <Box sx={sx}>
            <canvas style={{ width: "100%", minWidth: "800px", height: "100%" }} id={id}></canvas>
        </Box>
    );
}
