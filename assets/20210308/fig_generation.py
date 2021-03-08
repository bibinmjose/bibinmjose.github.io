import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

mu_sigmas = [(3,1),(7,1),(5,0.5),(5,3),(1,0.5),(1,3),(7,0.5),(7,3)]

preds = {'_'.join(map(str,c)):np.random.normal(c[0],c[1],1000) for c in mu_sigmas}
actuals = {'actual_dist':np.random.normal(5,1,1000)}

pred_df = pd.DataFrame(preds)
act_df = pd.DataFrame(actuals)

## coverage
def coverage(target, forecast):
    return (np.mean((target < forecast)))

## quantile loss
def quantile_loss(target, forecast, q):
    return round(2*np.sum(np.abs((forecast-target)*((target<=forecast)-q))),2)

target = 5
quantiles = [0.1,0.3,0.5,0.7,0.9]

loss_dict = {}
for p, vals in preds.items():
    loss_ = {}
    for q in quantiles:
        pred = np.quantile(vals, q)
        loss_[q]={'l':quantile_loss(target,pred,q),'c':coverage(target,pred)}
    loss_dict[p]=loss_

# fig, ax = plt.subplots(nrows=2,ncols=4, figsize=(12,4))
with plt.style.context('seaborn'):
    ax = pred_df.plot(kind='kde', subplots=True, color='b', legend=False, alpha=0.4,
                      sharey=True, sharex=True, layout=(2,4), figsize=(16,7))

    for a, col in zip(ax.flatten(),pred_df.columns):
    #     act_df.plot(kind='kde', color='r',ax=a, legend=False)
        a.plot([5],[0],marker='o',color='r')
        a.set_title("\u03BC={0}, \u03C3={1}".format(*col.split('_')))
        for q in quantiles:
            a.text(-14,0.8-q*0.4,f"{q} :{loss_dict[col][q]}", fontsize='x-large')

    plt.xlim(-15,25)
    plt.tight_layout()
    plt.show()
    # plt.savefig('loss_distro.png', dpi=100,
    #             orientation='portrait', papertype=None, format='png',
    #             transparent=True, bbox_inches=None, pad_inches=0.2, metadata=None)