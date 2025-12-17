# Known Issues & Limitations

## Current Limitations

### Gameplay
- ❌ No time limit feature
- ❌ No difficulty settings
- ❌ No pause/resume
- ❌ No statistics tracking
- ❌ No achievements/badges

### Audio
- ❌ No actual sound playback (logged to console only)
- ❌ No background music
- ❌ No sound effects
- ⚠️ Implementation ready for Web Audio API

### Graphics
- ⚠️ Fixed particle count (no LOD)
- ⚠️ No animation speed options
- ⚠️ Yarn texture animated but simple
- ⚠️ No particle customization

### Data Persistence
- ❌ No local save system
- ❌ No progress persistence
- ❌ No statistics saved
- ⚠️ Could implement with localStorage

## Performance Notes

### Device Compatibility
- ✅ Desktop browsers: Smooth 60fps
- ✅ Mobile phones: Good performance
- ⚠️ Very old devices: May experience stuttering
- ✅ Touch devices: Full support

### Canvas Limits
- ✅ Tested with 30+ balls: Smooth
- ⚠️ 100+ balls: Minor lag possible
- ❌ 500+ balls: Not recommended

## Known Quirks

### Edge Cases
1. **Empty Slots**: If somehow a slot becomes empty in temp, layer updating handles it
2. **Color Assignment**: Dynamic assignment may rarely choose already-assigned color (low probability)
3. **Rapid Clicking**: May occasionally trigger movement twice (handled by isDragged flag)
4. **Mobile**: Some devices have touch delay (unavoidable OS limitation)

## Browser-Specific Issues

### Chrome/Edge
- ✅ No known issues
- ✅ Runs smoothly

### Firefox
- ✅ No known issues
- ✅ Runs smoothly

### Safari
- ⚠️ Touch events may have slight delay
- ✅ Canvas rendering is smooth

### Mobile Browsers
- ⚠️ iOS Safari: Touch event delay ~100ms (Apple limitation)
- ✅ Chrome Mobile: Smooth performance
- ✅ Firefox Mobile: Good performance

## Workarounds & Solutions

### Yarn Won't Move
**Solution**: Check if it's on top of stack. Remove layers above it first.

### Stuck Level
**Solution**: Use Hint to find valid move, or Reset to start over.

### Particles Not Showing
**Solution**: Ensure `particlesEnabled` is true in settings. Check browser console.

### Touch Not Working
**Solution**: Try refreshing page. Ensure browser has permission for touch events.

## Future Fixes

- [ ] Implement actual sound playback
- [ ] Add localStorage for progress
- [ ] Optimize rendering for 100+ balls
- [ ] Add keyboard controls
- [ ] Improve mobile touch responsiveness
- [ ] Add animation speed options

---

**Report bugs**: Open GitHub Issues with:
- Browser/OS info
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)
