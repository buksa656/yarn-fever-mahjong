// Rendering engine with Mahjong layer visualization
class Renderer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.slotWidth = 70;
        this.slotHeight = 150;
        this.yarnRadius = 22;
        this.yarnSpacing = 30;
        this.resize();
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.scale = this.canvas.width / rect.width;
    }

    render(yarns, targetSlots, tempSlots, blockerSlots, draggedYarn, particles = []) {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(245, 247, 250, 0.95)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid pattern
        this.drawGridPattern();

        // Draw section labels
        this.drawLabels(targetSlots.length, tempSlots.length);

        // Draw target slots
        this.drawSlots(targetSlots, 'target', 50);

        // Draw blocker holder
        this.drawSlots(blockerSlots, 'blocker', this.canvas.height / 2 - 40);

        // Draw temp slots (Mahjong stack)
        this.drawSlots(tempSlots, 'temp', this.canvas.height - 190);

        // Draw yarns (in order)
        yarns.forEach(yarn => {
            if (yarn !== draggedYarn && !yarn.isDragged) {
                this.drawYarn(yarn);
            }
        });

        // Draw particles
        particles.forEach(p => p.draw(this.ctx));

        // Draw dragged yarn on top
        if (draggedYarn) {
            this.drawYarn(draggedYarn, true);
        }
    }

    drawGridPattern() {
        this.ctx.strokeStyle = 'rgba(200, 200, 220, 0.1)';
        this.ctx.lineWidth = 1;
        const gridSize = 50;

        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    drawLabels(targetCount, tempCount) {
        this.ctx.fillStyle = '#666';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';

        // Target slots label
        this.ctx.fillText('🎯 TARGET SLOTS', this.canvas.width / 2, 25);

        // Blocker slots label
        this.ctx.fillText('🛑 BLOCKER HOLDER', this.canvas.width / 2, this.canvas.height / 2 - 50);

        // Temp slots label
        this.ctx.fillText('📚 MAHJONG STACK', this.canvas.width / 2, this.canvas.height - 200);
    }

    drawSlots(slots, type, y) {
        const spacing = 18;
        const totalWidth = slots.length * (this.slotWidth + spacing);
        const startX = (this.canvas.width - totalWidth) / 2;

        slots.forEach((slot, index) => {
            const x = startX + index * (this.slotWidth + spacing);
            this.drawSlot(slot, x, y, type);
            slot.renderPosition = { x, y, width: this.slotWidth, height: this.slotHeight };
        });
    }

    drawSlot(slot, x, y, type) {
        const isComplete = slot.isComplete();
        const isFull = slot.yarns.length >= slot.capacity;

        // Draw slot background
        const gradient = this.ctx.createLinearGradient(x, y, x, y + this.slotHeight);

        if (type === 'target') {
            if (isComplete) {
                gradient.addColorStop(0, '#90EE90');
                gradient.addColorStop(1, '#66BB6A');
            } else {
                gradient.addColorStop(0, '#FFB6C1');
                gradient.addColorStop(1, '#FF69B4');
            }
        } else if (type === 'blocker') {
            gradient.addColorStop(0, '#FFE4B5');
            gradient.addColorStop(1, '#FFD700');
        } else {
            gradient.addColorStop(0, '#E0E7FF');
            gradient.addColorStop(1, '#C7D2FE');
        }

        this.ctx.fillStyle = gradient;
        this.ctx.strokeStyle = type === 'target' ? '#FF1493' : (type === 'blocker' ? '#FF8C00' : '#667eea');
        this.ctx.lineWidth = isFull ? 3 : 2;
        this.roundRect(x, y, this.slotWidth, this.slotHeight, 12);
        this.ctx.fill();
        this.ctx.stroke();

        // Draw completion indicator
        if (isComplete) {
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('✓', x + this.slotWidth / 2, y + 25);
        }

        // Draw capacity indicator
        const indicatorColor = type === 'target' ? '#FF1493' : (type === 'blocker' ? '#FF8C00' : '#667eea');
        this.ctx.fillStyle = indicatorColor;
        this.ctx.font = 'bold 11px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(
            `${slot.yarns.length}/${slot.capacity}`,
            x + this.slotWidth / 2,
            y + this.slotHeight + 8
        );

        // Draw target color indicator
        if ((type === 'target' || type === 'blocker') && slot.targetColor) {
            this.ctx.fillStyle = slot.targetColor;
            this.ctx.fillRect(x + 5, y + 5, 15, 15);
            this.ctx.strokeStyle = '#333';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(x + 5, y + 5, 15, 15);
        }

        // Draw layer indicator for temp slots
        if (type === 'temp' && slot.yarns.length > 0) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.font = '10px Arial';
            this.ctx.textAlign = 'center';
            const layerText = `L${slot.yarns.length}`;
            this.ctx.fillText(layerText, x + this.slotWidth / 2, y + this.slotHeight - 10);
        }
    }

    drawYarn(yarn, isDragged = false) {
        const pos = this.getYarnScreenPosition(yarn);

        // Draw glow if dragged or hinted
        if (isDragged || yarn.showHint) {
            this.ctx.fillStyle = yarn.showHint ? 'rgba(255, 215, 0, 0.5)' : 'rgba(100, 150, 255, 0.3)';
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, this.yarnRadius + 8, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Draw yarn ball with gradient
        const gradient = this.ctx.createRadialGradient(
            pos.x - 6, pos.y - 6, 5,
            pos.x, pos.y, this.yarnRadius
        );
        gradient.addColorStop(0, this.lightenColor(yarn.color, 25));
        gradient.addColorStop(0.5, yarn.color);
        gradient.addColorStop(1, this.darkenColor(yarn.color, 15));

        this.ctx.fillStyle = gradient;
        this.ctx.strokeStyle = this.darkenColor(yarn.color, 30);
        this.ctx.lineWidth = isDragged ? 3 : 2;
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, this.yarnRadius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();

        // Draw texture
        this.ctx.strokeStyle = this.darkenColor(yarn.color, 50);
        this.ctx.lineWidth = 1.5;
        this.ctx.globalAlpha = 0.4;

        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2 + (Date.now() / 5000);
            this.ctx.beginPath();
            this.ctx.arc(
                pos.x + Math.cos(angle) * 6,
                pos.y + Math.sin(angle) * 6,
                this.yarnRadius - 5,
                0,
                Math.PI * 2
            );
            this.ctx.stroke();
        }

        this.ctx.globalAlpha = 1;

        // Store position for hit detection
        yarn.renderPosition = { x: pos.x, y: pos.y, radius: this.yarnRadius };
    }

    getYarnScreenPosition(yarn) {
        if (yarn.dragPosition) {
            return yarn.dragPosition;
        }

        const slot = yarn.currentSlot;
        if (slot && slot.renderPosition) {
            const slotPos = slot.renderPosition;
            const stackIndex = slot.yarns.indexOf(yarn);
            const yOffset = this.yarnSpacing * stackIndex;

            return {
                x: slotPos.x + slotPos.width / 2,
                y: slotPos.y + slotPos.height - 30 - yOffset
            };
        }

        return { x: 0, y: 0 };
    }

    isYarnAtPosition(yarn, pos) {
        if (!yarn.renderPosition) return false;
        const dx = pos.x - yarn.renderPosition.x;
        const dy = pos.y - yarn.renderPosition.y;
        return Math.sqrt(dx * dx + dy * dy) < yarn.renderPosition.radius;
    }

    isSlotAtPosition(slot, pos) {
        if (!slot.renderPosition) return false;
        const slotPos = slot.renderPosition;
        return pos.x >= slotPos.x &&
            pos.x <= slotPos.x + slotPos.width &&
            pos.y >= slotPos.y &&
            pos.y <= slotPos.y + slotPos.height;
    }

    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * this.scale,
            y: (e.clientY - rect.top) * this.scale
        };
    }

    roundRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    }

    lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R : 255) * 0x10000 +
            (G < 255 ? G : 255) * 0x100 +
            (B < 255 ? B : 255))
            .toString(16).slice(1);
    }

    darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return '#' + (0x1000000 + (R > 0 ? R : 0) * 0x10000 +
            (G > 0 ? G : 0) * 0x100 +
            (B > 0 ? B : 0))
            .toString(16).slice(1);
    }
}
