with open('d:/Projects/Tech@Work/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_methodology = """        <!-- ===== METHODOLOGY ===== -->
        <section class="px-6 md:px-12 max-w-7xl mx-auto mb-[120px]" id="how-it-works">
            <div class="mb-12 scroll-reveal">
                <h3 class="text-primary font-headline font-bold tracking-widest uppercase text-sm mb-4">Methodology</h3>
                <h2 class="font-headline font-black text-5xl md:text-6xl uppercase tracking-tighter mb-4" data-blur-text data-blur-delay="150">
                    How We <span class="text-zinc-500">Work</span>
                </h2>
            </div>

            <div class="relative mt-16">
                <!-- Neon connector line (desktop only) -->
                <div class="hidden md:block neon-line" id="timeline-line" style="top: 40px; left: 12.5%; right: 12.5%;"></div>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-6" id="timeline-grid">
                    <div class="glass-card p-8 bg-[#1B1B1B] text-center relative scroll-reveal">
                        <div class="glow-node mx-auto mb-6"></div>
                        <div class="text-5xl font-headline font-black text-primary mb-4 opacity-80">01</div>
                        <h3 class="font-headline font-bold uppercase tracking-wider text-xl mb-4 text-zinc-100">Discovery</h3>
                        <p class="text-zinc-400 text-sm leading-relaxed font-light">Understanding goals and bottlenecks in your current operations.</p>
                    </div>
                    <div class="glass-card p-8 bg-[#1B1B1B] text-center relative scroll-reveal" data-delay="1">
                        <div class="glow-node mx-auto mb-6"></div>
                        <div class="text-5xl font-headline font-black text-[#becc9a] mb-4 opacity-80">02</div>
                        <h3 class="font-headline font-bold uppercase tracking-wider text-xl mb-4 text-zinc-100">Strategy</h3>
                        <p class="text-zinc-400 text-sm leading-relaxed font-light">Designing AI + digital infrastructure tailored to your needs.</p>
                    </div>
                    <div class="glass-card p-8 bg-[#1B1B1B] text-center relative scroll-reveal" data-delay="2">
                        <div class="glow-node mx-auto mb-6"></div>
                        <div class="text-5xl font-headline font-black text-[#e38cb8] mb-4 opacity-80">03</div>
                        <h3 class="font-headline font-bold uppercase tracking-wider text-xl mb-4 text-zinc-100">Execution</h3>
                        <p class="text-zinc-400 text-sm leading-relaxed font-light">Development, deployment, and optimization.</p>
                    </div>
                    <div class="glass-card p-8 bg-[#1B1B1B] text-center relative scroll-reveal" data-delay="3">
                        <div class="glow-node mx-auto mb-6"></div>
                        <div class="text-5xl font-headline font-black text-zinc-400 mb-4 opacity-80">04</div>
                        <h3 class="font-headline font-bold uppercase tracking-wider text-xl mb-4 text-zinc-100">Scale</h3>
                        <p class="text-zinc-400 text-sm leading-relaxed font-light">Analytics, growth systems, and ongoing optimization.</p>
                    </div>
                </div>
            </div>
        </section>
"""

idx_services_start = -1
idx_services_end = -1
idx_howitworks_start = -1
idx_howitworks_end = -1
idx_aiinfra_start = -1
idx_aiinfra_end = -1

for i, line in enumerate(lines):
    if '<!-- ===== SERVICES GRID ===== -->' in line: idx_services_start = i
    if '<!-- ===== HOW IT WORKS ===== -->' in line: idx_howitworks_start = i
    if '<!-- ===== EXPERTISE MARQUEE ===== -->' in line:
        idx_services_end = idx_howitworks_start
        idx_howitworks_end = i
    if '<!-- ===== AI INFRASTRUCTURE ===== -->' in line: idx_aiinfra_start = i
    if '<!-- ===== CASE STUDIES ===== -->' in line: idx_aiinfra_end = i

print(f'{idx_services_start=} {idx_services_end=} {idx_howitworks_start=} {idx_howitworks_end=} {idx_aiinfra_start=} {idx_aiinfra_end=}')

if -1 not in (idx_services_start, idx_services_end, idx_howitworks_start, idx_howitworks_end, idx_aiinfra_start, idx_aiinfra_end):
    new_lines = lines[:idx_services_start] + [new_methodology] + lines[idx_howitworks_end:idx_aiinfra_start] + lines[idx_aiinfra_end:]
    with open('d:/Projects/Tech@Work/index.html', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
else:
    print('Failed to find all section boundaries')
